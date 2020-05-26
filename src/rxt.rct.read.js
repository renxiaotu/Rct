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
        this.getData32=function (canvas,sx=0,sy=0,sw=0,sh=0) {return new Uint32Array(this.getData(canvas,sx,sy,sw,sh).data.buffer);};

        /**读取画布指定色值所在坐标
         * @param canvas    画布
         * @param color     指定色值[r,g,b,a]  [红，绿，蓝，不透明度]
         * @param deviation 色值偏差0~255
         * @param space     间隔（每间隔指定步数读取一个像素）
         * @param reverse   反选-读取除指定颜色外的所有
         * @returns {[]}    色值数组
         */
        this.getGridByColor=function (canvas,color=[255,255,255,255],deviation=0,space=0,reverse=false) {
            let data= this.getData(canvas).data;
            let gridList=[];
            let width=canvas.width;
            let height=canvas.height;
            space=Math.max(parseInt(space),0)+1;

            if(reverse){
                deviation++;
                for (let x = 0; x < width; x += space) {
                    for (let y = 0; y < height; y += space) {
                        let i=(y * width + x)*4;
                        let bool=true;
                        if(Math.abs(data[i]-color[0])>deviation)bool=false;
                        if(bool&&Math.abs(data[i+1]-color[1])>deviation)bool=false;
                        if(bool&&Math.abs(data[i+2]-color[2])>deviation)bool=false;
                        if(bool&&Math.abs(data[i+3]-color[3])>deviation)bool=false;
                        if(!bool)gridList.push({x:x, y:y,data:[data[i],data[i+1],data[i+2],data[i+3]]});
                    }
                }
            }else{
                for (let x = 0; x < width; x += space) {
                    for (let y = 0; y < height; y += space) {
                        let i=(y * width + x)*4;
                        if(Math.abs(data[i]-color[0])>deviation)continue;
                        if(Math.abs(data[i+1]-color[1])>deviation)continue;
                        if(Math.abs(data[i+2]-color[2])>deviation)continue;
                        if(Math.abs(data[i+3]-color[3])>deviation)continue;
                        gridList.push({x:x, y:y,data:[data[i],data[i+1],data[i+2],data[i+3]]});
                    }
                }
            }
            console.log(gridList);
            return gridList;
        }
    };

	if(!window.hasOwnProperty('rxt'))window.rxt={};
    if(!window.rxt.hasOwnProperty('rct'))window.rxt.rct={};
	window.rxt.rct.read=new read();
})(window);