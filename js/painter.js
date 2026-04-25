const canvas = document.getElementById('drawCanvas');

const ctx = canvas.getContext('2d');

//setting paintbrush defaults:
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

canvas.addEventListener('mouseup', function(e){
    isDrawing = false;
})

canvas.addEventListener('mouseleave', function(e){
    isDrawing = false;
})

// color picker:

const colorPicker = document.getElementById('colorPicker');

colorPicker.addEventListener('change', function(e){
    ctx.strokeStyle = e.target.value;
})