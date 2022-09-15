import Canvas from "./Canvas.js";
import Dot from "./entities/Dot.js";
import Line from "./entities/Line.js";

const canvas = new Canvas('#screen', 500, 500);



class Engine {
    cacheItems = [];
    items = [];
    snaps = [];
    pointA = null;
    pointB = null;
    color = "black";
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
            
            this.items.forEach( (item, index) => {
                const { x, y } = item;
                const obj2 = { x, y, width: 10, height: 10 };
                const isCollide = this.collision(cursor, obj2);

                if(isCollide){
        
                    console.log('Должна быть проверка на занятость точки другой линией')
                    if(item.type==='Dot'){
                        item.reserved = true
                    }
                    if(this.pointA===null){
                        this.pointA = { x, y}
                    }
                    else{
                        this.pointB = { x, y }
                        const line = new Line(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y, this.color);
                        this.items.unshift(line);
                        this.pointA = null
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

        for(let i=1; i<=this.rows; i++){
            for(let j=1; j<=this.cols; j++){
                let index = i*j;
                const dot = new Dot( j * this.gap, i * this.gap, index, "black");
                this.items.push(dot);
            }

        }
        
    }
    render (){
        canvas.clear()
        this.items.forEach( (item) => {
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
            width: 5, 
            height: 5
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
    redo (){
        this.items.shift();
        this.resetSnap();
    }
}

export default Engine;


  
// Circle.prototype.touched