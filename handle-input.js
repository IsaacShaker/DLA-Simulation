let userWaves = document.getElementById('waves');
let userParticles = document.getElementById('particles');
let userSpeed = document.getElementById('speed');
let userRadius = document.getElementById('radius');
let userColor = document.getElementById('color');
let userStickiness = document.getElementById('stickiness');
let error = document.getElementById('error');

function runSim() {
    // collect user input and make sure it is not already animating
    if (animation == false) {
        // handles user input

        if (userParticles.value == "" || userWaves.value == "" || userSpeed.value == "" || userStickiness.value == "" || userColor.value == "" || globalRadius == "") {
            error.innerHTML = "All Inputs Are Required";
            return;
        }

        stuckColor = userColor.value.toLowerCase();

        let found = false;
        for (let i = 0; i < COLORS.length; i++) {
            if (stuckColor == COLORS[i]) found = true;
        }

        if (found == false) {
            error.innerHTML = "Invalid Color";
            return;
        }

        error.innerHTML = "";

        curIter = 0;
        numParticles = parseInt(userParticles.value);
        iterations = parseInt(userWaves.value);
        speed = parseInt(userSpeed.value);
        globalRadius = parseInt(userRadius.value);
        stickProb = parseInt(userStickiness.value);

        animation = true;
        init();
        animate();
        animate();

        numRuns++;
    }
}

function resetSim() {
    // go back to default values
    animation = false;

    aggrogate.length = 0;
    walkers.length = 0;
    numRuns = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// mouse interactive stuff
const mouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener('mousemove', function(event){
    if (paint == true) {
        mouse.x = event.x - widthAdj;
        mouse.y = event.y - heightAdj;

        if (mouse.x >= 0 && mouse.x <= 400 && mouse.y >= 0 && mouse.y <=400 && animation == false) {
            let part = new Particle(mouse.x, mouse.y, true, stuckColor, globalRadius);
            part.draw();
            aggrogate.push(part);
        }
    }
});

window.addEventListener('mousedown', function() {
    paint = true;
});

window.addEventListener('mouseup', function() {
    paint = false;
});