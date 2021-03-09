# image-history

本库用于记录某一节点下图片的**增减历史**。不兼容 IE 和 旧版 Edge。可作为 `wangEditor` 的插件使用。

功能点：

* 支持配置**监听的HTML attribute**
* 支持配置图片链接的**过滤规则**
* 支持**统计**绑定的跟节点下所有的**图片链接**及同一链接**出现的次数**
* 在被绑定的根节点下，同一图片链接多次出现时，只有该**链接全部被删除才会被定义为已删除**

# 安装

### npm

```shell
npm install image-history
```

### cdn

```html
<script src="https://cdn.jsdelivr.net/npm/image-history@0.0.3/dist/index.min.js"></script>
```


# 使用

### 构造函数

> `new ImageHistory(root[, listener[, defaultFilter]])`

> `new ImageHistory(root[, listener[, customFilter[, defaultFilter]]])`

> `new ImageHistory(root[, listener[, customFilters[, defaultFilter]]])`

参数|数据类型|描述|默认值
:-|:-|:-|:-|
`root`|`Element`|绑定的根节点|
`listener`|`Object`|自定义监听配置|
`customFilter`|`Function`|自定义验证函数|
`customFilters`|`Array`|由自定义验证函数构成的数组|
`defaultFilter`|`Boolean`|是否启用内置验证规则（`!/^(blob:.+;base64:|data:)/`）|`true`

##### `eg`：`new ImageHistory(root)`
```js
// 被监听的节点/跟节点
const target = document.querySelector('#root')

// 普通的初始化
const imageHistory = new ImageHistory(target)
```

##### `eg`：`new ImageHistory(root, listener)`
```js
// 添加自定义图片监听规则
const imageHistory = new  ImageHistory(edit.$textElem.elems[0], {
    // nodeName: [attribute, attribute]
    video: ['poster'],  // 监听视频的封面图
})
```

##### `eg`：`new ImageHistory(root, listener, defaultFilter)`
```js
// 关闭内置的图片过滤规则
const imageHistory = new ImageHistory(target, null, false)
```

##### `eg`：`new ImageHistory(root, listener, customFilter, defaultFilter)`
```js
// 添加图片过滤规则并关闭内置的过滤规则
const imageHistory = new ImageHistory(target, null, function (img) {
    // img 是本次验证的图片链接。函数需要返回 true/false。
    return /^https:\/\/baidu.com/.test(img)
}, false)
```

##### `eg`：`new ImageHistory(root, listener, customFilters)`
```js
// 添加多条图片过滤规则
const imageHistory = new ImageHistory(target, null, [
    function (img) {
        return /^https:\/\/baidu.com/.test(img)
    },
    function (img) {
        return /^https:\/\/ali.com/.test(img)
    }
])
```

### 实例属性

```js
const imageHistory = new ImageHistory(document.querySelector('#root'))

const root = imageHistory.root                 // 当前实例绑定的根节点。只读。

const listener = imageHistory.listener         // 当前实例绑定的监听规则。只读。

const primordial = imageHistory.primordial     // 实例初始化时已经存在的图片链接以及同一链接出现的次数。只读。
```

### 实例方法

```js
const imageHistory = new ImageHistory(document.querySelector('#root'))

// 返回所有的历史记录信息。返回一个数组。
const all = imageHistory.all()                      // [{ src: '', type: 'deleted' }, { src: '', type: 'inserted' }]

// 获取被删除图片的 src 集合。返回一个一维数组。
const deleted = imageHistory.deleted()              // ['http://xxx/xxa.jpg', 'http://xxx/xxb.png']

// 获取新增图片的 src 集合。返回一个一维数组。
const inserted = imageHistory.inserted()            // ['http://xxx/xxc.jpg', 'http://xxx/xxd.png']

// 统计当前跟节点下的图片链接及同一链接出现的次数
const statistics = imageHistory.statistics()        // [['http://xxx/xxc.jpg', 3], ['http://xxx/xxe.png', 1]]

// 清除记录
imageHistory.clear()

// 销毁监听器（销毁将清理数据并停止监听）
imageHistory.destory()
```

### 在 wangEditor 中使用

```js
const editor = new wangEditor('#div')
editor.create()

editor.txt.html(`
<p><img src="https://img.zcool.cn/community/015a556041f0ff11013f374504f478.jpg@260w_195h_1c_1e_1o_100sh.jpg" alt="" srcset=""></p>
<p><img src="https://img.zcool.cn/community/01d9d7603f1c1611013ef90f6cfe2d.jpg" alt="" srcset=""></p>`)

// 必须放在 editor.create 之后。建议放在 editor.txt.html 之后。
const imageHistory = new ImageHistory(editor.$textElem.elems[0])

// 在 wangEditor 销毁前销毁图片监听器。
editor.beforeDestroy(() => imageHistory.destory())
```
