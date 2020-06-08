(function (window,document) {
    let matrix=function () {
        const random = (items) => items[Math.floor(Math.random() * items.length)];
        const bg=document.createElement('canvas');
        const p=document.createElement('canvas');
        const bg_ctx = bg.getContext("2d");
        const ctx = p.getContext("2d");
        document.body.append(bg);
        document.body.append(p);

        this.backgroundColor='#000';
        this.zIndex=-1;
        this.space=15;
        this.step=0.5;
        this.len=150;
        this.string='01';

        let w,h,l=[],hex = this.string.split("");
        let _this=this;

        this.start=function(){
            p.style.width=bg.style.width='100vw';
            p.style.height=bg.style.height='100vh';
            p.style.position=bg.style.position='fixed';
            p.style.left=bg.style.left='0';
            p.style.top=bg.style.top='0';
            bg.style.backgroundColor=this.backgroundColor;
            p.style.backgroundColor='rgba(0,0,0,0)';
            bg.style.zIndex=(this.zIndex-1).toString();
            p.style.zIndex=this.zIndex;

            hex = this.string.split("");

            this.resize();
            render();
        }

        this.resize=function(){
            p.width = bg.width = w = p.offsetWidth;
            p.height = bg.height = h = p.offsetHeight;


            let add_num=Math.floor(w / _this.space)-l.length;
            bg_ctx.fillStyle='rgb(255,255,255)';
            if(add_num>0){
                for(let i=0;i<add_num;i++){
                    for(let j=0;j<h;j+=10){
                        bg_ctx.fillText(random(hex), (l.length-1) * _this.space, j);
                    }
                    l.push(Math.round(Math.random()*(h+_this.len))-_this.len);
                }
            }else if(add_num<0){
                l.splice(-add_num,add_num);
            }

            l.map((v, i) => {
                for(let j=0;j<h;j+=10){
                    bg_ctx.fillText(random(hex), i * _this.space, j);
                }
            });
        }


        function render(){
            requestAnimationFrame(render);
            ctx.fillStyle='rgb(0,0,0)';
            ctx.fillRect(0,0,w,h);
            l.map((v, i) => {
                if(v>h)v=-_this.len;
                let my_gradient=ctx.createLinearGradient(0,v,0,v+_this.len);
                my_gradient.addColorStop(0,"rgba(0,0,0,1)");
                my_gradient.addColorStop(0.5,"rgba(0,0,0,.8)");
                my_gradient.addColorStop(1,"rgba(0,0,0,1)");
                ctx.fillStyle=my_gradient;
                ctx.clearRect(i*_this.space,v+1,10,_this.len-2);
                ctx.fillRect(i*_this.space,v,10,_this.len);
                v+=_this.step;
                l[i]=v;
            });
        }

        window.onresize=this.resize;
    };

    if(!window.hasOwnProperty('rxt'))window.rxt={};
    if(!window.rxt.hasOwnProperty('rct'))window.rxt.rct={};
    if(!window.rxt.rct.hasOwnProperty('background'))window.rxt.rct.background={};
    window.rxt.rct.background.matrix=new matrix();
})(window,document);