const fishCanvas = document.getElementById('fishCanvas');
const spawnBtn = document.getElementById('spawnBtn');

const fishCtx = fishCanvas.getContext('2d');

fishCanvas.width = window.innerWidth;
fishCanvas.height = window.innerHeight;

window.addEventListener('resize', function(){

});

// fish array to store fish objects
const fishArray = [];
const spawnAnimations = [];
//spawn button for the fish
const name = fishName.value || "Fih"
const dataURL = drawCanvas.toDataURL('image/png'); //converst user drawing to the encoded png

const img = new Image();
img.src = dataURL;

img.onload = function(){
    //random span point
    const randomNum = Math.random() < 0.5
    const x = startFromLeft ? -100: fishCanvas.width + 100 // start from the left or the right, if cooinflip is  ture start from left, if not start from right, both ofscreen
    const y = Math.random() * (fishCanvas.height - 200) + 50; // starts from random y position, but dumber between canvas (hight -200)+ 50, so it't not too close to the edge

    // random movement
    

}