// get canvas element
const canvas = document.querySelector('#draw');
// get context
const ctx = canvas.getContext('2d');
// resize canvas to the width/height of window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// color to start drawing with
ctx.strokeStyle = '#BADA55';
// shape of end of line
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;
// kind of blends the colors as you color them on top of one another
ctx.globalCompositeOperation = 'multiply';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  if(!isDrawing) return; // stops the function if mouse not clicked
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  // start from
  ctx.moveTo(lastX, lastY);
  // go to
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  // reset origin
  /*lastX = e.offsetX;
  lastY = e.offsetY;
  ES6 to reset both on same line via destructuring an array */
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++;
  if (hue >= 360) {
    hue = 0;
  }

if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
  direction = !direction;
}
if(direction) {
  ctx.lineWidth++;
}
else {
  ctx.lineWidth--;
}

}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
