class Random {
    constructor() {
        this.useA = false;
        let sfc32 = function (uint128Hex) {
            let a = parseInt(uint128Hex.substring(0, 8), 16);
            let b = parseInt(uint128Hex.substring(8, 16), 16);
            let c = parseInt(uint128Hex.substring(16, 24), 16);
            let d = parseInt(uint128Hex.substring(24, 32), 16);
            return function () {
                a |= 0;
                b |= 0;
                c |= 0;
                d |= 0;
                let t = (((a + b) | 0) + d) | 0;
                d = (d + 1) | 0;
                a = b ^ (b >>> 9);
                b = (c + (c << 3)) | 0;
                c = (c << 21) | (c >>> 11);
                c = (c + t) | 0;
                return (t >>> 0) / 4294967296;
            };
        };
        // seed prngA with first half of tokenData.hash
        this.prngA = new sfc32(tokenData.hash.substring(2, 34));
        // seed prngB with second half of tokenData.hash
        this.prngB = new sfc32(tokenData.hash.substring(34, 66));
        for (let i = 0; i < 1e6; i += 2) {
            this.prngA();
            this.prngB();
        }
    }
    // random number between 0 (inclusive) and 1 (exclusive)
    random_dec() {
        this.useA = !this.useA;
        return this.useA ? this.prngA() : this.prngB();
    }
    // random number between a (inclusive) and b (exclusive)
    random_num(a, b) {
        return a + (b - a) * this.random_dec();
    }
    // random integer between a (inclusive) and b (inclusive)
    // requires a < b for proper probability distribution
    random_int(a, b) {
        return Math.floor(this.random_num(a, b + 1));
    }
    // random boolean with p as percent liklihood of true
// random value in an array of items
    random_choice(list) {
        return list[this.random_int(0, list.length - 1)];
    }
}

let phaseOffset, moonCenterX, moonCenterY, random, canvasSize, phase = 0, direction = 1,
    bgColors = ["red", "blue", "yellow", "white"], divisions = [], moonRadius = 100, moonSpeed = .0025;

function setup() {
    canvasSize = Math.min(window.innerWidth, window.innerHeight), moonRadius = canvasSize / 10, createCanvas(canvasSize, canvasSize), frameRate(60), random = new Random, phaseOffset = random.random_num(0, TWO_PI);
    let n = random.random_int(4, 7);
    for (let e = 0; e < n; e++) divisions.push(new Division(random));
    moonCenterX = canvasSize / 2, moonCenterY = canvasSize / 2
}

function windowResized() {
    canvasSize = Math.min(window.innerWidth, window.innerHeight), moonRadius = canvasSize / 10, resizeCanvas(canvasSize, canvasSize), moonCenterX = canvasSize / 2, moonCenterY = canvasSize / 2
}

function draw() {
    scale(canvasSize / 1e3);
    background(255);

    for (let n = 0; n < divisions.length; n++) {
        divisions[n].update();
        divisions[n].display();
    }

    // Calculate the position of the moon based on the center of the canvas
    let moonX = moonCenterX + cos(phase + phaseOffset) * (canvasSize / 2 - moonRadius);
    let moonY = moonCenterY + sin(phase + phaseOffset) * (canvasSize / 2 - moonRadius);

    // Calculate the angle to rotate the moon so that the white side faces the center of the canvas at a right angle
    let moonAngle = atan2(moonCenterY - moonY, moonCenterX - moonX) + PI;

    // Draw the moon with the adjusted angle
    drawMoonPhase(moonX, moonY, moonAngle);

    phase += moonSpeed;
}


function drawMoonPhase(x, y, angle) {
    noStroke();
    fill(255);
    ellipse(x, y, 2 * moonRadius, 2 * moonRadius);
    fill(0);

    let s = map(phase + phaseOffset, 0, TWO_PI, -HALF_PI, HALF_PI);

    beginShape();
    for (let i = -HALF_PI; i <= HALF_PI; i += .01) {
        let a = x + cos(i + s + angle) * moonRadius;
        let o = y + sin(i + s + angle) * moonRadius;
        vertex(a, o);
    }
    endShape(CLOSE);
}






class Division {
    constructor(n) {
        let e = createVector(canvasSize / 2, canvasSize / 2), s = Math.min(canvasSize, canvasSize) / 4,
            i = p5.Vector.random2D().mult(n.random_num(0, s)).add(e), a = n.random_num(50, 500),
            o = n.random_num(50, 500);
        this.x = i.x, this.y = i.y, this.angle = n.random_num(0, TWO_PI), this.speed = n.random_num(5e-4, .01), this.color = n.random_choice(bgColors), this.width = a, this.height = o
    }

    update() {
        this.angle += this.speed
    }

    display() {
        push(), translate(this.x, this.y), rotate(this.angle), fill(this.color), rect(0, 0, this.width, this.height), pop()
    }
}