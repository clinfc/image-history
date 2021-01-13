/**
 * @protected 媒体文件（image）监控
 */

/**
 * 图片的历史记录，需要在 editor.create 之后调用
 *
 * eg：editor.imgs = new ImageHistory(editor.$textElem.elems[0])
 */
export default class ImageHistory {
    /**
     * 监听器
     */
    private observer: MutationObserver

    /**
     * image 标签的变化记录。boolean 值表示 image 标签当前的状态，为 true 表示存在于文档中；为 false 表示该 image 标签被删除。
     */
    private data: Map<string, boolean> = new Map()

    /**
     * @param target 被监听的 HTMLElement 节点，这里指 wangEditor 的编辑区根节点
     */
    constructor(protected target: Element) {
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((record) => {
                if (record.type == 'childList') {
                    const { addedNodes, removedNodes } = record

                    removedNodes.forEach((node) => {
                        if (node.nodeName == 'IMG') {
                            this.data.set((node as HTMLImageElement).getAttribute('src') as string, false)
                        }
                    })
                    addedNodes.forEach((node) => {
                        if (node.nodeName == 'IMG') {
                            this.data.set((node as HTMLImageElement).getAttribute('src') as string, true)
                        }
                    })
                } else {
                    const { target, oldValue } = record
                    if (target.nodeName == 'IMG') {
                        oldValue && this.data.set(oldValue as string, false)
                        this.data.set((target as HTMLImageElement).getAttribute('src') as string, true)
                    }
                }
            })
        })
        // 绑定监听
        this.observer.observe(target, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeOldValue: true,
            attributeFilter: ['src'],
        })
    }

    /**
     * 被删除图片链接的数组集合
     */
    public deleted() {
        const temp: string[] = []
        this.data.forEach((status, src) => {
            if (!status) {
                temp.push(src)
            }
        })
        return temp
    }

    /**
     * 新增图片链接的数组集合
     */
    public inserted() {
        const temp: string[] = []
        this.data.forEach((status, src) => {
            if (status) {
                temp.push(src)
            }
        })
        return temp
    }

    /**
     * 返回所有的历史记录信息
     */
    public all() {
        return [...this.data].map(([src, status]) => ({
            src: src,
            type: status ? 'inserted' : 'deleted',
        }))
    }

    /**
     * 清除所有的历史记录
     */
    public clear() {
        this.data.clear()
    }

    /**
     * 销毁监听器
     */
    public destory() {
        this.observer.disconnect()
        this.clear()
    }
}
