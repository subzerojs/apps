
import Engine from "./Engine.js";




const ROWS = 10;
const COLS = 10;
const GAP = 40;
const engine = new Engine(ROWS, COLS, GAP);
window.engine = engine

engine.mount();
/*
const line = new Line(0, 0, 102, 102)
const line2 = new Line(102, 102, 252, 102)

const dot = new Dot(100, 100);
const dot2 = new Dot(250, 100);
*/
//engine.items = [ line, line2, dot, dot2]

engine.render()
setInterval(() => {
    engine.render()
}, 100)

drawColors()
function drawColors (){
    const $colors = document.querySelectorAll('.colors_item');
    $colors.forEach( ($color) => {
        $color.addEventListener('click', function (){
            engine.color = this.dataset.color;
        });
        $color.style['background-color'] = $color.dataset.color
    })
}
/**
 * reset snap
 */
document.querySelector('.tools__reset-snap').addEventListener('click', () => {
    engine.resetSnap();
})

/**
 * redo
 */
 document.querySelector('.tools__redo').addEventListener('click', () => {
    engine.redo();
})
