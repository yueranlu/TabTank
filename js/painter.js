const canvas = document.getElementById('drawCanvas');
const drawBtn = document.getElementById('drawBtn');
const drawOverlay = document.getElementById('drawOverlay');
const fishName = document.getElementById('fishName');
const brushSlider = document.getElementById('brushSlider');
const eraser = document.getElementById('eraserBtn');
const colorPicker = document.getElementById('colorPicker');
const clearBtn = document.getElementById('clearBtn');

const ctx = canvas.getContext('2d');

//---overlay---
drawBtn.addEventListener('click', function(){
    if (drawOverlay.style.display === 'flex') {
        drawOverlay.style.display = 'none';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fishName.value = '';
    } else {
        drawOverlay.style.display ='flex'
    }
});

//---- Paint brush ------
ctx.lineWidth = '4'
ctx.lineCap = 'round'
ctx.lineJoin = 'round'
ctx.strokeStyle = '#000000'

let isDrawing = false;

// event listeners for the pen:
canvas.addEventListener('mousedown',function(e){
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
})

canvas.addEventListener('mousemove', function(e){
    if(!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
})

canvas.addEventListener('mouseup', function(){
    isDrawing = false;
})

canvas.addEventListener('mouseleave', function(){
    isDrawing = false;
})
//---- Brush Size -----
brushSlider.addEventListener("input", function(){
    ctx.lineWidth = brushSlider.value;
})


//---- Eraser ----
eraser.addEventListener('click', function(){
    ctx.globalCompositeOperation = 'destination-out';
})
colorPicker.addEventListener('change', function(){
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = colorPicker.value; // back to normal drawing when color is picked
})

//---- Clear Button ----
clearBtn.addEventListener('click', function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
})
