[rct](https://dev.renxiaotu.com/js/rct) — renxiaotu canvas tools|任小兔画布工具箱
==============

工具列表
--------------
1. [rxt.rct.read](#rxt.rct.read)

# rxt.rct.read
画布数据读取工具

演示：[https://dev.renxiaotu.com/js/rct/demo/read](https://dev.renxiaotu.com/js/rct/demo/read)

- [getData](#getData)：读取ImageData对象
- [getData32](#getData32)：画布像素色值转10进制(Uint32Array)
- [getGridByColor](#getGridByColor)：读取色值范围所在坐标和颜色

## getData

读取ImageData对象

**参数：**

| 名称 | 数据类型 | 是否必须 | 默认值 | 说明 |
|---------|--------|--------|------|--------------|
| canvas | object | 是 | 无 | 浏览器画布对象 |
| sx | number | 否 | 0 | 开始位置x值 |
| sy | number | 否 | 0 | 开始位置y值 |
| sw | number | 否 | 0 | 读取宽度 |
| sh | number | 否 | 0 | 读取高度 |

**返回：**

```js
/**数据举例
 *例中数据展示了4个像素的数据，每个像素由数组的四个数组成
 *每个像素的四个数分别代表R、G、B、A四个色值
 */
Uint8ClampedArray(16) [
    255, 0, 255, 255,
    252, 0, 255, 255,
    251, 0, 255, 255,
    249, 0, 255, 255
]
```

## getData32

画布像素色值转10进制(Uint32Array)

**参数：**

| 名称 | 数据类型 | 是否必须 | 默认值 | 说明 |
|---------|--------|--------|------|--------------|
| canvas | object | 是 | 无 | 浏览器画布对象 |
| sx | number | 否 | 0 | 开始位置x值 |
| sy | number | 否 | 0 | 开始位置y值 |
| sw | number | 否 | 0 | 读取宽度 |
| sh | number | 否 | 0 | 读取高度 |

**返回：**

```js
/**数据举例
 *例中数据展示了4个像素的数据
 *每个像素为一个256进制四位数的10进制结果，由高到低分别为R、G、B、A四个色值
 */
Uint32Array(16) [
    4294902015, 
    4294902012, 
    4294902011, 
    4294902009
]
```

## getGridByColor

读取色值范围所在坐标和颜色

**参数：**

/**读取画布指定色值所在坐标
         * @param canvas    画布
         * @param color     指定色值[r,g,b,a]  [红，绿，蓝，不透明度]
         * @param deviation 色值偏差0~255
         * @param step      步进（每读取一个像素前进指定步数）
         * @param reverse   反选-读取除指定颜色外的所有
         * @returns {[]}    色值数组
         */

| 名称 | 数据类型 | 是否必须 | 默认值 | 说明 |
|---------|--------|--------|------|--------------|
| canvas | object | 是 | 无 | 浏览器画布对象 |
| color | array(4) | 否 | [255,255,255,255] | 查找色值[r,g,b,a] |
| deviation | number | 否 | 0 | 色值偏差(容错)0~255 |
| space | number | 否 | 0 | 间隔（每间隔指定步数读取一个像素） |
| reverse | bool | 否 | false | 反选 |

**返回：**

```js
/**数据举例
 *例中数据展示了4个像素的数据，每个像素为一个对象
 *每个像素对象含三个属性
 *  data：色值[r,g,b,a]
 *  x：像素x坐标
 *  y：像素y坐标
 */
Array(4) [
    {
        data: [90, 0, 166, 255],
        x: 202,
        y: 0
    },{
        data: [90, 0, 166, 255],
        x: 202,
        y: 2
    },{
        data: [90, 0, 166, 255],
        x: 202,
        y: 4
    },{
        data: [90, 0, 166, 255],
        x: 202,
        y: 6
    }
]
```