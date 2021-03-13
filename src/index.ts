/**
 * @protected 媒体文件（image）监控
 */

/*
1、初始化时建立镜像，作为多频次链接是否为原始链接的依据
2、新增的多频次链接未被删尽时仍被认为是新增链接
3、需要区分链接为新增或删除
3、新增的链接是镜像中存在的链接时，不被认定为新增链接

名词解释：
    多频图片：同一链接多次出现
    镜像数据：被绑定的根节点下某一时刻的图片数据。比如二次编辑文章时需要构建镜像数据作为后续图片增减的依据。
*/

type Listener = {
    [propName: string]: Set<string>
}

export type Validator = (value: string) => boolean

export type Targets = {
    [propName: string]: string[]
}

/**
 * 统计链接及同一个链接出现的次数
 */
export type Mirroring = {
    [propName: string]: number
}

function attributeFilter(listener: Listener) {
    const filter: string[] = []
    Object.values(listener).forEach(row => {
        filter.push(...row)
    })
    return filter
}

/**
 * 验证当前节点是否为有效节点
 * @param listener 被监听的节点缓存
 * @param node 被验证的节点
 */
function isValidElem(listener: Listener, node: Node) {
    return node instanceof Element && listener[node.nodeName] instanceof Set
}

/**
 * 验证 attribute 名是否有效
 * @param node 被验证的 Element 节点
 * @param attr 被验证的 attribute 名
 */
function isValidAttr(listener: Listener, node: Node, attr: string | null) {
    return attr && node instanceof Element && listener[node.nodeName] instanceof Set && listener[node.nodeName].has(attr)
}

function verify(node: Node, listener: Listener) {
    const images: Set<string> = new Set()
    if (isValidElem(listener, node)) {
        listener[node.nodeName].forEach(attr => {
            if ((node as Element).hasAttribute(attr)) {
                images.add((node as Element).getAttribute(attr) as string)
            }
        })
    }
    return [...images]
}

/**
 * 图片的历史记录，需要在 editor.create 之后调用
 *
 * eg：editor.imgs = new ImageHistory(editor.$textElem.elems[0])
 */
export default class ImageHistory {
    #root: Element

    /**
     * 需要被监听的节点的 nodeName 及对应的 attribute 属性名
     */
    #listener: Listener = {}

    /**
     * 监听器
     */
    #observer: MutationObserver

    /**
     * 根节点下某一刻的图片镜像数据
     */
    #mirroring: Mirroring

    /**
     * image 标签的变化记录。boolean 值表示 image 标签当前的状态，为 true 表示存在于文档中；为 false 表示该 image 标签被删除。
     */
    #changed: Map<string, boolean> = new Map()

    /**
     * 图片链接的验证规则
     *
     */
    #rules: Validator[] = []

    /**
     * 当前实例监听的根节点
     */
    public get root() {
        return this.#root
    }

    /**
     * 当前实例的图片镜像数据
     */
    public get mirroring() {
        return { ...this.#mirroring }
    }

    /**
     * 监听的节点类型及该节点对应监听的 attribute 名
     */
    public get listener() {
        const temp: { [propName: string]: string[] } = {}
        Object.entries(this.#listener).forEach(([nodeName, attrs]) => {
            temp[nodeName] = [...attrs]
        })
        return temp
    }

    /**
     * @param root 被监听的 Element 节点，这里指 wangEditor 的编辑区根节点
     */
    constructor(root: Element, targets?: Targets, filter?: Validator | Validator[] | false, defFilter: boolean = true) {
        // 被监听的根节点
        this.#root = root

        // 初始化需要被监听的节点的 nodeName 及对应的 attribute 属性名
        if (targets && typeof targets === 'object') {
            Object.keys(targets).forEach(nodeName => {
                this.#listener[nodeName.toUpperCase()] = new Set(targets[nodeName])
            })
        }
        // 添加默认监听 img 的  src attribute
        if (this.#listener['IMG']) {
            this.#listener['IMG'].add('src')
        } else {
            this.#listener['IMG'] = new Set(['src'])
        }

        // 初始化过滤规则
        // 内置规则（非 base64/URL.createObjectURL 图片链接）
        if (filter !== false && defFilter) {
            this.#rules.push(function (value: string) {
                return !/^(data:|blob:)/.test(value)
            })
        }
        // 用户自定义规则
        if (Array.isArray(filter)) {
            this.#rules.push(...filter)
        } else if (typeof filter === 'function') {
            this.#rules.push(filter)
        }

        this.#mirroring = this.statistics()

        // 初始化监听器
        this.#observer = new MutationObserver(mutations => {
            mutations.forEach(record => {
                if (record.type == 'childList') {
                    const { addedNodes, removedNodes } = record

                    removedNodes.forEach(node => {
                        verify(node, this.#listener).forEach(img => {
                            if (this.valid(img)) {
                                this.#changed.set(img, false)
                            }
                        })
                    })

                    addedNodes.forEach(node => {
                        verify(node, this.#listener).forEach(img => {
                            if (this.valid(img)) {
                                this.#changed.set(img, true)
                            }
                        })
                    })
                } else {
                    const { target, oldValue, attributeName } = record
                    if (isValidAttr(this.#listener, target, attributeName)) {
                        if (oldValue && this.valid(oldValue)) {
                            this.#changed.set(oldValue as string, false)
                        }
                        const attr = (target as Element).getAttribute(attributeName as string) as string
                        if (attr && this.valid(attr)) {
                            this.#changed.set(attr, true)
                        }
                    }
                }
            })
        })

        // 绑定监听
        this.#observer.observe(root, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeOldValue: true,
            attributeFilter: attributeFilter(this.#listener),
        })
    }

    /**
     * 返回所有的历史记录信息
     */
    public all() {
        // 镜像图片
        const old = this.#mirroring

        // 统计当前的图片
        const now = this.statistics()

        // 生成所有的图片历史记录信息
        const temp: { image: string; type: 'inserted' | 'deleted' }[] = []
        this.#changed.forEach((status, img) => {
            // 新添加的图片 && 非镜像中的图片
            if (status && !old[img]) {
                temp.push({
                    image: img,
                    type: 'inserted',
                })
            }
            // 被删除的图片
            else {
                // 该图片被删尽
                if (!now[img]) {
                    temp.push({
                        image: img,
                        type: 'deleted',
                    })
                } else if (!old[img]) {
                    // 图片未被删尽（多频图片） && 非镜像中的图片
                    temp.push({
                        image: img,
                        type: 'inserted',
                    })
                }
            }
        })
        return temp
    }

    /**
     * 新增图片链接的数组集合
     */
    public inserted() {
        return this.all()
            .filter(row => row.type === 'inserted')
            .map(row => row.image)
    }

    /**
     * 被删除图片链接的数组集合
     */
    public deleted() {
        return this.all()
            .filter(row => row.type === 'deleted')
            .map(row => row.image)
    }

    /**
     * 统计当前的图片链接以及对应的链接次数
     */
    public statistics() {
        const temp: Mirroring = {}
        Object.keys(this.#listener).forEach(nodeName => {
            const nodes = Array.from(this.#root.querySelectorAll(nodeName))
            nodes.forEach(el => {
                this.#listener[nodeName].forEach(attr => {
                    if (el.hasAttribute(attr)) {
                        const img = el.getAttribute(attr) as string
                        if (temp[img]) {
                            temp[img] += 1
                        } else {
                            temp[img] = 1
                        }
                    }
                })
            })
        })
        return temp
    }

    /**
     * 重新构建镜像数据（将此刻的图片数据作为后续的判断依据，且曾经的历史记录将被清除）
     */
    public rebuild() {
        this.#mirroring = this.statistics()
        this.clear()
        return this.mirroring
    }

    /**
     * 清除所有的历史记录
     */
    public clear() {
        this.#changed.clear()
    }

    /**
     * 销毁监听器
     */
    public destory() {
        this.#observer.disconnect()
        this.#changed.clear()
        this.#listener = {}
        this.#mirroring = {}
    }

    /**
     * 验证链接是否符合规范
     * @param img 图片链接
     */
    public valid(img: string) {
        for (let fn of this.#rules) {
            if (!fn(img)) {
                return false
            }
        }
        return true
    }
}
