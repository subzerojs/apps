class Line {

    type = 'Line'
    constructor (x, y, x2, y2, fill, lineWidth = 5){
        this.x = x;
        this.y = y;
        this.x2 = x2;
        this.y2 = y2;
        this.fill = fill;
        this.lineWidth = lineWidth;
    }

    draw (ctx){
        
        ctx.strokeStyle = this.fill;
        ctx.lineWidth = this.lineWidth;
        ctx.lineCap = 'round';
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
        ctx.restore();
    }
}

export default Line;