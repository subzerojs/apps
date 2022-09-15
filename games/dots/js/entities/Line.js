class Line {
    lineWidth = 5;
    type = 'Line'
    constructor (x, y, x2, y2, fill){
        this.x = x;
        this.y = y;
        this.x2 = x2;
        this.y2 = y2;
        this.fill = fill;
    }

    draw (ctx){
        
        ctx.strokeStyle = this.fill;
        ctx.lineWidth = this.lineWidth;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
        ctx.restore();
    }
}

export default Line;