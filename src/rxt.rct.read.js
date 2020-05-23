(function(window){
	let read=function(){
        /**读取画布的像素色值
         * @param canvas    要读取的画布
         * @param sx        开始位置x值
         * @param sy        开始位置y值
         * @param sw        读取宽度
         * @param sh        读取高度
         * @returns {ImageData}
         */
        this.getData=function (canvas,sx=0,sy=0,sw=0,sh=0) {
            if(typeof sx === "string")sx=parseInt(sx);
            if(typeof sy === "string")sy=parseInt(sy);
            if(typeof sw === "string")sw=parseInt(sw);
            if(typeof sh === "string")sh=parseInt(sh);
            if(sw===0)sw=canvas.width;
            if(sh===0)sh=canvas.height;
            console.log([sx, sy, sw, sh]);
            return canvas.getContext('2d').getImageData(sx, sy, sw, sh);
        };

        /**画布像素色值转10进制(Uint32Array)
         * @param canvas
         * @param sx
         * @param sy
         * @param sw
         * @param sh
         * @returns {Uint32Array}
         */
        this.getData32=function (canvas,sx=0,sy=0,sw=null,sh=null) {return new Uint32Array(this.getData(canvas,sx,sy,sw,sh).data.buffer);};

        /**读取画布指定色值所在坐标
         * @param canvas    画布
         * @param color     指定色值[r,g,b,a,d]  [红，绿，蓝，不透明度，偏差]
         * @param step      步进（每读取一个像素前进指定步数）
         * @param reverse   反选-读取除指定颜色外的所有
         * @returns {[]}    色值数组
         */
        this.getGridByColor=function (canvas,color=[255,255,255,255,0],step=1,reverse=false) {
            color=color[2]+color[1]*256+color[0]*65536+color[3]*16777216;
            let data32= this.getData32(canvas);
            let gridList=[];
            let width=canvas.width;
            let height=canvas.height;
            step=Math.max(parseInt(step),1);
            if(reverse){
                for (let x = 0; x < width; x += step) {
                    for (let y = 0; y < height; y += step) {
                        if(data32[y * width + x]!==color){
                            gridList.push({x:x, y:y});
                        }
                    }
                }
            }else{
                for (let y = 0; y < height; y += step) {
                    for (let x = 0; x < width; x += step) {
                        if(data32[y*width + x]===color){
                            gridList.push({x:x, y:y});
                        }
                    }
                }
            }
            return gridList;
        }
    };

	if(!window.hasOwnProperty('rxt'))window.rxt={};
    if(!window.rxt.hasOwnProperty('rct'))window.rxt.rct={};
	window.rxt.rct.read=new read();
})(window);