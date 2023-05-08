const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const brushSize = document.getElementById('brushSize');
const colorPicker = document.getElementById('colorPicker');
const clearCanvas = document.getElementById('clearCanvas');
const saveCanvas = document.getElementById('saveCanvas');
const undoCanvas = document.getElementById('undoCanvas');

let painting = false;
let savedStates = [];

function startPosition(e) {
  painting = true;
  saveState();
  draw(e);
}

function finishedPosition() {
  painting = false;
  ctx.beginPath();
}

function draw(e) {
  if (!painting) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  ctx.lineWidth = brushSize.value;
  ctx.lineCap = 'round';
  ctx.strokeStyle = colorPicker.value;
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function clearCanvasArea() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveState() {
  savedStates.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

function undo() {
  if (savedStates.length < 2) return;
  savedStates.pop();
  const previousState = savedStates[savedStates.length - 1];
  ctx.putImageData(previousState, 0, 0);
}

function saveAsImage() {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'my_painting.png';
  link.click();
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);
clearCanvas.addEventListener('click', clearCanvasArea);
saveCanvas.addEventListener('click', saveAsImage);
undoCanvas.addEventListener('click', undo);

saveState();