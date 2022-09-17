import Canvas from "./Canvas.js";
import Dot from "./entities/Dot.js";
import Line from "./entities/Line.js";
import Snap from "./entities/Snap.js";


const canvas = new Canvas('#screen', 500, 500);

window.canvas = canvas

class Engine {
    cacheItems = [];
    dots = [];
    lines = [];
    snaps = [null, null];
    pointA = null;
    pointB = null;
    color = "black";
    scale = 1;
    zoomX = 1.2;
    //offsetX = 0;
    //offsetY = 0;
    constructor (rows, cols, gap){
        this.rows = rows;
        this.cols = cols;
        this.gap = gap;
    }

    mount (){
        // scale
        // abc 134
        // save / load shapes 

        this.grid();
        canvas.canvas.addEventListener('click', (event) => {
            const cursor = this.getCursor( event );
            
            this.dots.forEach( (item) => {
                const dot = { 
                    x: item.x, 
                    y: item.y, 
                    width: item.R * 2, // * this.scale, 
                    height: item.R * 2 //* this.scale 
                };
                const isCollide = this.collision(cursor, dot);

                if(!isCollide) return;
                const snap = new Snap( dot.x, dot.y,  "deepskyblue", 6);
                this.snaps[1] = snap;
                if(this.pointA===null){
                    this.pointA = { x: item.x, y: item.y }
                   // this.snaps[1] = null;
                }
                else{
                    this.pointB = { x: item.x, y: item.y }

                    this.addLine();
                }
                
            })
        })
        let isHover = false;

        canvas.canvas.addEventListener('mousemove', (event) => {
                if(!isHover){
                    this.snaps[0] = null;
                }
                const cursor = this.getCursor( event );
                this.dots.forEach( (item, index) => {
                    const dot = { 
                        x: item.x, 
                        y: item.y, 
                        width: item.R * 2, //* this.scale, 
                        height: item.R * 2 //* this.scale 
                    };
                    const isCollide = this.collision(cursor, dot);
                    if(isCollide){
                        isHover = true;
                        const snap = new Snap( dot.x, dot.y, "magenta", 6);
                        this.snaps[0] = snap;

                    }
                    else{
                        isHover = false;
                        
                    }


                });

           
        })
        
    }
    grid (){
        this.dots = [];
        for(let i=1; i<=this.rows; i++){
            for(let j=1; j<=this.cols; j++){
                let index = i*j;
                let x = j * this.gap//* this.scale;
                let y = i * this.gap//* this.scale;
                let R = 3 //* this.scale;
                const dot = new Dot( x, y, index, "black", R);
                this.dots.push(dot);
            }

        }
        
    }
    render (){
        canvas.clear()
        const shapes = [ ...this.lines, ...this.dots, ...this.snaps ];
        shapes.forEach( (item) => {
            if(item===null) return;
            item.draw(canvas.ctx);
        })
       // window.requestAnimationFrame(this.render.bind(this))
    }
    getCursor ( event ) {
        const bounds = event.target.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;
        return { 
            x: Math.floor(x), 
            y: Math.floor(y), 
            width: 10, 
            height: 10
        };
    }
    collision(obj1, dot){
        let XColl=false;
        let YColl=false;
      
        if ((obj1.x + obj1.width >= dot.x) && (obj1.x <= dot.x + dot.width)) XColl = true;
        if ((obj1.y + obj1.height >= dot.y) && (obj1.y <= dot.y + dot.height)) YColl = true;
      
        if (XColl&YColl){return true;}
        return false;
    }
    resetSnap (){
        this.pointA = null;
        this.snaps[1] = null;
    }
    undo (){
        this.lines.pop();
        this.resetSnap();
    }
    addLine (){
        let lineWidth = 5 * this.scale;
        const line = new Line(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y, this.color, lineWidth);
        this.lines.push(line);
        this.pointA = this.pointB;
    }
    zoomIn (){
        this.scale = this.scale + 0.2;
        console.log(this.scale)

        //canvas.ctx.scale(this.scale, this.scale);
        /*
        this.scale = this.scale * this.zoomX;
        this.lines = this.lines.map((line) => {
            line.lineWidth = 5 * this.scale;
            line.x = line.x * this.zoomX;
            line.y = line.y * this.zoomX;
            line.x2 = line.x2 * this.zoomX;
            line.y2 = line.y2 * this.zoomX;
            return line;
        });*/

      //  this.grid();
    }
    zoomOut (){
        this.scale = this.scale - 0.3;
        console.log(this.scale)
        //canvas.ctx.scale(this.scale, this.scale);
/*
        this.scale = this.scale / this.zoomX;
        this.lines = this.lines.map((line) => {
            line.lineWidth =  line.lineWidth / this.zoomX;
            line.x = line.x / this.zoomX;
            line.y = line.y / this.zoomX;
            line.x2 = line.x2 / this.zoomX;
            line.y2 = line.y2 / this.zoomX;
            return line;
        });
        this.grid();*/
    }
    translate (){
        
        //this.offsetX = this.offsetX + 100;
        //canvas.ctx.translate(-this.offsetX, this.offsetY);

        //canvas.ctx.clearRect(this.offsetX, 0, canvas.canvas.width+this.offsetX, canvas.canvas.height+this.offsetX) 

    }
}

export default Engine;
