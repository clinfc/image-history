# image-history

image-history 用作记录图片的 插入/删除。可作为 wangEditor 的插件使用。不兼容 IE 和 旧版 Edge。


# 安装

### npm

```
npm install image-history
```

### script

当前并未发布 npm 包，直接引入 dist/index.min.js 文件即可

```html
<script src="image-history/dist/index.min.js"></script>
```


# 使用

### API

```js
// 被监听的节点/跟节点
const target = document.querySelector('#root')

// 初始化监听器
const imageHistory = new ImageHistory(target)

// 获取被删除图片的 src 集合。返回的是一个一维数组。
const deleted = imageHistory.deleted()

// 获取新增图片的 src 集合。返回的是一个一维数组。
const inserted = imageHistory.inserted()

// 返回所有的历史记录信息。返回一个数组,eg: [{ src: '', type: 'deleted' }, { src: '', type: 'inserted' }]
const all = imageHistory.all()

// 清除记录
imageHistory.clear()

// 销毁监听器（销毁将清理数据并停止监听）
imageHistory.destory()
```

### 在 wangEditor 中使用

```js
const editor = new wangEditor('#div')
editor.create()

// 必须放在 editor.create 之后
const imageHistory = new ImageHistory(editor.$textElem.elems[0])

// 在 wangEditor 销毁前销毁图片监听器
editor.boforeDestory(imageHistory.destory)
```
