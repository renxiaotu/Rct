[rct](https://dev.renxiaotu.com/js/rct) — renxiaotu canvas tools|任小兔画布工具箱
==============

工具列表
--------------
1. [rxt.rct.read](#rxt.rct.read)

# rxt.rct.read
画布数据读取工具

- [getData](#getData)：读取ImageData对象
- [getData32](#getData32)：画布像素色值转10进制(Uint32Array)
- [getGridByColor](#getGridByColor)：读取色值范围所在坐标和颜色

## getData

参数:

| 名称 | 是否必须 | 默认值 | 说明 |
|---------|--------|------|--------------|
| canvas | 是 | 无 | 浏览器画布对象 |
| sx | 否 | 0 | 开始位置x值 |
| sy | 否 | 0 | 开始位置y值 |
| sw | 否 | 0 | 读取宽度 |
| sh | 否 | 0 | 读取高度 |

返回：

_例子_
```js
//数据举例
Uint8ClampedArray(180000) [
    255, 0, 255, 255,
    252, 0, 255, 255,
    251, 0, 255, 255,
    249, 0, 255, 255
]
```