// setup the canvas
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const style = canvas.style;
const TOP = 0.5;
const LEFT = 0.75;
canvas.width = 400;
canvas.height = 400;

// acount for the alignment adjustment 
var widthAdj = (window.innerWidth * LEFT) - (canvas.width / 2);
var heightAdj = (window.innerHeight * TOP) - (canvas.height / 2);

// Setup for DLA simulation // these are default values
var speed = 100;
var numParticles = 0;
var curIter = 0;
var iterations = 1;
var numRuns = 0;

var animation = false;
var paint = false;
var aggrogate = [];
var walkers = [];

// animate and perform the simulation
function init() {
    if (curIter < 1 && numRuns < 1) {
    aggrogate.push(new Particle(canvas.width / 2, canvas.height / 2, true, stuckColor, globalRadius));
    }

    for (let i = 0; i < numParticles; i++) {
        walkers.push(new Particle());
    }
    curIter++;
}

function handleParticles() {
    for (let i = 0; i < aggrogate.length; i++) {
        aggrogate[i].draw();
    }
    
    for (let p = 0; p < walkers.length; p++) {
        walkers[p].draw();
    }

    for (let k = 0; k < speed; k++) {
        for (let j = 0; j < walkers.length; j++) {
            walkers[j].move();

            if (walkers[j].checkStick(aggrogate) == true) {
                walkers[j].color = stuckColor;
                aggrogate.push(walkers[j]);
                walkers.splice(j, 1);
                j--;
            }
        }
    }

    if (walkers.length === 0 && curIter < iterations) {
        init();
    }
    else if (walkers.length === 0) {
        animation = false;
    }
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    if (animation == true) {
        requestAnimationFrame(animate);
    }
}
