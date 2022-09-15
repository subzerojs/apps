class Dot {
    #originalFill = null;
    reserved = false;
    type = 'Dot';
    constructor (x, y, index, fill, R = 3){
        this.x = x;
        this.y = y;
        this.index = index;
        this.fill = fill;
        this.R = R;
        this.#originalFill = fill;
    }
    draw (ctx){
        ctx.save();
        //ctx.alpha = 0.1;
        ctx.fillStyle = this.fill;
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.R, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }
    active (ctx){
        this.fill = 'darkcyan'//this.fill;
        //this.draw(ctx)
    }
    restore (ctx){
        this.fill =  this.#originalFill;
        //this.draw(ctx)
    }
}

export default Dot;