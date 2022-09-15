import Canvas from "./Canvas.js";
import Dot from "./entities/Dot.js";
import Line from "./entities/Line.js";

const canvas = new Canvas('#screen', 500, 500);



class Engine {
    cacheItems = [];
    dots = [];
    lines = [];
    //snaps = [];
    pointA = null;
    pointB = null;
    color = "black";
    scale = 1;
    zoomX = 1.2;
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
        let prevItem = null
        canvas.canvas.addEventListener('click', (event) => {
            const cursor = this.getCursor( event );
            
            this.dots.forEach( (item, index) => {
                const { x, y } = item;
                const obj2 = { x, y, width: item.R * 2 * this.scale, height: item.R * 2 * this.scale };
                const isCollide = this.collision(cursor, obj2);

                if(isCollide){
                    if(this.pointA===null){
                        this.pointA = { x, y}
                    }
                    else{
                        this.pointB = { x, y }
                        this.addLine()
                    }
                    
                   // item.active(canvas.ctx)
                }
                else{
                  //  if(prevItem) prevItem.restore(canvas.ctx);
                }
                
            })
            prevItem = null
        })
        //let isHover = false;
        //let countMove = 0;
        /*
        canvas.canvas.addEventListener('mousemove', (event) => {
            if(countMove===5){
                console.log(countMove)

                countMove = 0
            }
            countMove++
           
        })*/
        
    }
    grid (){
        this.dots = [];
        for(let i=1; i<=this.rows; i++){
            for(let j=1; j<=this.cols; j++){
                let index = i*j;
                let x = j * this.gap* this.scale;
                let y = i * this.gap * this.scale;
                let R = 3 * this.scale;
                const dot = new Dot( x, y, index, "black", R);
                this.dots.push(dot);
            }

        }
        
    }
    render (){
        canvas.clear()
        const shapes = [ ...this.lines, ...this.dots ];
        shapes.forEach( (item) => {
            item.draw(canvas.ctx)
        })
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
    collision(obj1, obj2){
        let XColl=false;
        let YColl=false;
      
        if ((obj1.x + obj1.width >= obj2.x) && (obj1.x <= obj2.x + obj2.width)) XColl = true;
        if ((obj1.y + obj1.height >= obj2.y) && (obj1.y <= obj2.y + obj2.height)) YColl = true;
      
        if (XColl&YColl){return true;}
        return false;
    }
    resetSnap (){
        this.pointA = null;
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
        this.scale = this.scale * this.zoomX;
        this.lines = this.lines.map((line) => {
            line.lineWidth = 5 * this.scale;
            line.x = line.x * this.zoomX;
            line.y = line.y * this.zoomX;
            line.x2 = line.x2 * this.zoomX;
            line.y2 = line.y2 * this.zoomX;
            return line;
        });
        this.grid();
    }
    zoomOut (){
        this.scale = this.scale / this.zoomX;
        this.lines = this.lines.map((line) => {
            line.lineWidth =  line.lineWidth / this.zoomX;
            line.x = line.x / this.zoomX;
            line.y = line.y / this.zoomX;
            line.x2 = line.x2 / this.zoomX;
            line.y2 = line.y2 / this.zoomX;
            return line;
        });
        this.grid();
    }
}

export default Engine;
