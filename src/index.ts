/**
 * @protected 媒体文件（image）监控
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
export type Statistics = {
    [propName: string]: number
}

function attributeFilter(listener: Listener) {
    const filter: string[] = []
    Object.values(listener).forEach(row => {
        filter.push(...row)
    })
    return filter
}

function initConfig(listener: Listener): MutationObserverInit {
    return {
        subtree: true,
        childList: true,
        attributes: true,
        attributeOldValue: true,
        attributeFilter: attributeFilter(listener),
    }
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

function verify(node: Node, listener: Listener, changed?: Map<string, boolean>, value?: boolean) {
    const images: Set<string> = new Set()
    if (isValidElem(listener, node)) {
        listener[node.nodeName].forEach(attr => {
            if ((node as Element).hasAttribute(attr)) {
                // changed.set((node as Element).getAttribute(attr) as string, value)
                images.add((node as Element).getAttribute(attr) as string)
            }
        })
    }
    return [...images]
}

/**
 * 统计链接及同一个链接出现的次数
 * @param root 根节点
 * @param listener 监听的属性
 */
function statistics(root: Element, listener: Listener) {
    const temp: Statistics = {}
    Object.keys(listener).forEach(nodeName => {
        const nodes = Array.from(root.querySelectorAll(nodeName))
        nodes.forEach(el => {
            listener[nodeName].forEach(attr => {
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
     * 记录原始图片
     */
    #primordial: Statistics

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
     * 统计初始化时就存在的图片链接以及对应的次数
     */
    public get primordial() {
        return Object.entries(this.#primordial)
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
                return !/^(blob:.+;base64:|data:)/.test(value)
            })
        }
        // 用户自定义规则
        if (Array.isArray(filter)) {
            this.#rules.push(...filter)
        } else if (typeof filter === 'function') {
            this.#rules.push(filter)
        }

        // 记录当前已存在的图片链接以及同一链接出现的次数
        this.#primordial = statistics(this.#root, this.#listener)

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
        this.#observer.observe(root, initConfig(this.#listener))
    }

    /**
     * 统计当前的图片链接以及对应的链接次数
     */
    public statistics() {
        return Object.entries(statistics(this.#root, this.#listener))
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
     * 新增图片链接的数组集合
     */
    public inserted() {
        return this.all()
            .filter(row => row.type === 'inserted')
            .map(row => row.image)
    }

    /**
     * 返回所有的历史记录信息
     */
    public all() {
        // 统计当前的图片链接数据
        const now = statistics(this.#root, this.#listener)
        // 统计同一张图片链接被全部删除的原始图片
        const deleted = Object.keys(this.#primordial).filter(img => !now[img])
        // 生成所有的图片历史记录信息
        const temp: { image: string; type: 'inserted' | 'deleted' }[] = []
        this.#changed.forEach((status, img) => {
            // 非原始图片 || 是原始图片，但是全部被删除了
            if (!this.#primordial[img] || deleted.includes(img)) {
                temp.push({
                    image: img,
                    type: status ? 'inserted' : 'deleted',
                })
            }
        })
        return temp
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
        this.#primordial = {}
    }

    /**
     * 验证链接是否符合规范
     * @param img 图片链接
     */
    public valid(img: string) {
        return this.#rules.reduce((ar, fn) => ar && fn(img), true)
    }
}
