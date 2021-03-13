# image-history

本库用于记录某一节点下图片的**增减历史**。不兼容 IE 和 旧版 Edge。

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
<script src="https://cdn.jsdelivr.net/npm/image-history@0.0.4/dist/index.min.js"></script>
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
`defaultFilter`|`Boolean`|是否启用内置验证规则|`true`

> 内置过滤规则：`!/^(data:|blob:)/`

#### `new ImageHistory(root)`

```js
// 被监听的节点/跟节点
const target = document.querySelector('#root')

// 普通的初始化
const imageHistory = new ImageHistory(target)
```

#### `new ImageHistory(root, listener)`

```js
// 添加自定义图片监听规则
const imageHistory = new  ImageHistory(target, {
    // nodeName: [attribute, attribute]
    video: ['poster'],  // 监听视频的封面图
})
```

#### `new ImageHistory(root, listener, defaultFilter)`

```js
// 关闭内置的图片过滤规则
const imageHistory = new ImageHistory(target, null, false)
```

#### `new ImageHistory(root, listener, customFilter, defaultFilter)`

```js
// 添加图片过滤规则并关闭内置的过滤规则
const imageHistory = new ImageHistory(target, null, function (img) {
    // img 是本次验证的图片链接。函数需要返回 true/false。
    return /^https:\/\/baidu.com/.test(img)
}, false)
```

#### `new ImageHistory(root, listener, customFilters, defaultFilter)`

```js
// 添加多条图片过滤规则并关闭内置的过滤规则
const imageHistory = new ImageHistory(target, null, [
    function (img) {
        return /^https:\/\/baidu.com/.test(img)
    },
    function (img) {
        return /^https:\/\/ali.com/.test(img)
    }
], false)
```

### 实例属性

#### `ImageHistory.root`

当前实例绑定的根节点。只读。

```js
const root = document.querySelector('#root')
const imageHistory = new ImageHistory(root)

const congruence = root === imageHistory.root  // true
```

#### `ImageHistory.listener`

当前实例绑定的监听规则。只读。

```js
const root = document.querySelector('#root')
const imageHistory = new ImageHistory(root, { video: ['poster'] })

// 当前实例监听了 img 标签的 src 属性（内置）和 video 标签的 poster 属性
const listener = imageHistory.listener  // { IMG: ['src'], VIDEO: ['poster'] }
```

#### `ImageHistory.mirroring`

实例的图片镜像数据。只读。

在初始化时构建或通过 `ImageHistory.rebuild()` 进行手动构建

```js
const root = document.querySelector('#root')
const imageHistory = new ImageHistory(root, { video: ['poster'] })

const mirroring = imageHistory.mirroring  // { 'http://xxx/xxc.jpg': 3, 'http://xxx/xxe.png': 1 }
```

### 实例方法

#### `ImageHistory.all()`

返回所有的历史记录信息。返回一个数组。

```js
const root = document.querySelector('#root')
const imageHistory = new ImageHistory(root)

const all = imageHistory.all()          // [{ image: '', type: 'deleted' }, { image: '', type: 'inserted' }]
```

#### `ImageHistory.inserted()`

获取被删除图片的 src 集合。返回一个数组。

```js
const root = document.querySelector('#root')
const imageHistory = new ImageHistory(root)

const inserted = imageHistory.inserted()     // ['http://xxx/xxc.jpg', 'http://xxx/xxd.png']
```

#### `ImageHistory.deleted()`

获取新增图片的 src 集合。返回一个数组。

```js
const root = document.querySelector('#root')
const imageHistory = new ImageHistory(root)

const deleted = imageHistory.deleted()      // ['http://xxx/xxa.jpg', 'http://xxx/xxb.png']
```

#### `ImageHistory.rebuild()`

重新构建镜像数据，此操作会自定清除历史记录，谨慎操作。

以当前时刻的图片数据作为后续图片增减的依据。返回一个对象。

```js
const root = document.querySelector('#root')
const imageHistory = new ImageHistory(root)

const mirroring = imageHistory.rebuild()   // { 'http://xxx/xxc.jpg': 3, 'http://xxx/xxe.png': 1 }
```

#### `ImageHistory.statistics()`

统计当前跟节点下的图片链接及同一链接出现的次数。返回一个对象。

```js
const root = document.querySelector('#root')
const imageHistory = new ImageHistory(root)

const statistics = imageHistory.statistics()   // { 'http://xxx/xxc.jpg': 3, 'http://xxx/xxe.png': 1 }
```

#### `ImageHistory.clear()`

清除记录。

```js
const root = document.querySelector('#root')
const imageHistory = new ImageHistory(root)

imageHistory.clear()
```

#### `ImageHistory.destory()`

销毁监听器（销毁将清理数据并停止监听）。

```js
const root = document.querySelector('#root')
const imageHistory = new ImageHistory(root)

imageHistory.destory()
```
