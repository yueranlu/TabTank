const fishCanvas = document.getElementById('fishCanvas');
const spawnBtn = document.getElementById('spawnBtn');
const fishName = document.getElementById('fishName');
const drawCanvas = document.getElementById('drawCanvas');
const drawOverlay = document.getElementById('drawOverlay');
const drawCtx = drawCanvas.getContext('2d')

const fishCtx = fishCanvas.getContext('2d');

fishCanvas.width = window.innerWidth;
fishCanvas.height = window.innerHeight;

window.addEventListener('resize', function(){
    fishCanvas.width = window.innerWidth;
    fishCanvas.height = window.innerHeight;
});

// fish array to store fish objects
const fishArray = [];

//spawn button for the fish
spawnBtn.addEventListener('click', function(){
    const name = fishName.value || "Fih"
    const dataURL = drawCanvas.toDataURL('image/png'); //converst user drawing to the encoded png
    const img = new Image();
    img.src = dataURL;

    // all values needed for the fish object
    img.onload = function(){
    //random span point
        const x = 100 + Math.random() * (fishCanvas.width - 200);
        const targetSpawnY= Math.random() * (fishCanvas.height - 200) + 50; // starts from random y position, but dumber between canvas (hight -200)+ 50, so it't not too close to the edge
        const y = -100;

        //pick a random destiation for each fish
        const destX = Math.random() * (fishCanvas.width - 100) + 50;
        const destY = Math.random() * (fishCanvas.height - 150) + 50;

        //pick random speeds
        const speed = Math.random() * 2 + 0.5 // speed between 0.5 and 2.5
        const wobbleOffset = Math.random() * Math.PI * 2
        const wobbleSpeed = Math.random() * 0.003 + 0.001
        const wobbleAmount = Math.random() * 0.7 + 0.3

        const fishWidth = Math.random() * 40 + 80
        const fishHeight = fishWidth * (drawCanvas.height / drawCanvas.width);

        // creating fish object
        const fish = {
        image: img,
        name: name,
        x: x,
        y: y,
        destX: destX,
        destY: destY,
        speed: speed,
        wobbleOffset: wobbleOffset,
        wobbleSpeed: wobbleSpeed,
        wobbleAmount: wobbleAmount,
        targetX: null,
        targetY: null,
        opacity: 0,
        spawning: true,
        velocityY: 0,
        targetSpawnY: targetSpawnY,
        width: fishWidth,
        height: fishHeight,
        }
        fishArray.push(fish)

        // now clear canvas
        drawOverlay.style.display = 'none';
        drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
        drawCtx.fillStyle = 'white';
        drawCtx.fillRect(0, 0, drawCanvas.width, drawCanvas.height);
        fishName.value = '';
    }

})


function animate(){
    fishCtx.clearRect(0,0,fishCanvas.width, fishCanvas.height)
    for (i = 0; i < fishArray.length; i++){
        const fih = fishArray[i];
        if (fih.spawning == true){
            if (fih.opacity < 1){
                fh.opacity += 0.03;
                fih.velocityY += 0.3;
                fih.y += fih.velocityY;
            }

            //check is fish has reached it;s corresponding y
            if (fih.y >= fish.tagetSpawnY){
                fish.y = fish.targetSpawnY;
                fish.velocity *= -0.4; // this will bounce the fish
                if (Math.abs(fish.velocity) < 0.5){
                    fish.spawning = false;
                    fish.opacity = 1;
                    fish.y = targetSpawnY;
                }
            }
        }

        if (fih.spawning == false){
            

        }
    }


}
