// default particle specs
var globalRadius = 5;
var stuckColor = 'red';
var stickProb = 100;
const DEF_COLOR = 'white';

const COLORS = ['red', 'blue', 'green', 'yellow', 'violet', 'turquoise', 'tan', 'skyblue', 'purple', 'pink', 'orange', 'olive', 'navy', 'crimson'];

// possible changes in x and y
const dx = [-1, 1, 0, 0];
const dy = [0, 0, 1, -1];

class Particle {
    constructor(userX, userY, userStuck, userColor, userRadius) {
        // define a particle. Otherwise it is set to default (random positon 
        // along the edge of canvas, default color (white), and not stuck)
        if (userX != undefined && userY != undefined && userStuck != undefined && userColor != undefined && userRadius != undefined) {
            this.x = userX;
            this.y = userY;
            this.stuck = userStuck;
            this.color = userColor;
            this.radius = userRadius;
        }
        else {
            var random = getRndInt(0,3);

            switch (random) {
                case 0:
                    this.x = 0;
                    this.y = getRndInt(0, canvas.height);
                    break;
                case 1:
                    this.x = canvas.width;
                    this.y = getRndInt(0, canvas.height);
                    break;
                case 2:
                    this.y = 0;
                    this.x = getRndInt(0, canvas.width);
                    break;
                case 3:
                    this.y = canvas.height;
                    this.x = getRndInt(0, canvas.width);
                    break;
            }

            this.prevX = this.x;
            this.prevY = this.y;
            this.stuck = false;
            this.color = DEF_COLOR;
            this.radius = globalRadius;
        }
    }
    
    move() {
        if (this.stuck == false) {
            // save previous position in case hits edge of canvas
            this.prevX = this.x;
            this.prevY = this.y;
            // move randomly in x and y direction
            this.x += dx[getRndInt(0, 3)];
            this.y += dy[getRndInt(0, 3)];

            // if movement made it hit the edge, set it back to previous position
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
    }

    draw() {
        // self explanitory
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    checkStick(others) {
        // checks distance with every piece of the aggrogate, if they are touching, make it stuck
        for (let i = 0; i < others.length; i++) {
            var actualDist= distance(this, others[i]);
            var touchDist = this.radius + others[i].radius;

            if (actualDist < (touchDist * touchDist)) {
                let random = getRndInt(1,100);

                if (random <= stickProb) {
                    this.stuck = true;
                    return true;
                }

                this.x = this.prevX;
                this.y = this.prevY
                return false;
            }
        }
        return false;
    }
}

function getRndInt(min, max) {
    // self explanitory (min and max are inclusive)
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function distance(point1, point2) {
    // in house distance function because sqrt() is slow
    var dX = point2.x - point1.x;
    var dY = point2.y - point1.y;

    // returns the  a^2 + b^2 of pythag. ther.
    return ((dX * dX) + (dY * dY));
}
