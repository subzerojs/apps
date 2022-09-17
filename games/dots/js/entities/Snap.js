class Snap {
    type = 'Snap';
    constructor (x, y, fill, R = 3){
        this.x = x;
        this.y = y;
        this.fill = fill;
        this.R = R;
    }
    draw (ctx){
        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.fill;
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.R, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
    }

}

export default Snap;