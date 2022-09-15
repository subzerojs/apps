

class Canvas {
    constructor (selector, width, height){
        this.canvas = document.querySelector(selector);
        this.ctx = this.canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.canvas.width = width;
        this.canvas.height = height;
    }
    draw (){
        this.clear()
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    clear (){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) 
    }
}

export default Canvas;