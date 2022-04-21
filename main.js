var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

var bugImg = new Image();
bugImg.src = "bug.png";
var dinoImg = new Image();
dinoImg.src = "dino.png";

var dino = {
    x: 10,
    y: window.innerHeight - 80,
    width: 50,
    height: 50,
    draw() {
        // ctx.fillStyle = "green";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(dinoImg, this.x, this.y, this.width, this.height);
    },
};

dino.draw();

class Cactus {
    constructor() {
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        // ctx.fillStyle = "red";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(bugImg, this.x, this.y, this.width, this.height);
    }
}

var cactus = new Cactus();
cactus.draw();

var timer = 0;
var allCactus = [];
var jumpTimer = 0;
var animation;
var speed = 5;

function 프레임() {
    animation = requestAnimationFrame(프레임);
    timer++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (timer % 80 === 0) {
        var cactus = new Cactus();
        allCactus.push(cactus);
    }

    allCactus.forEach((a, i, o) => {
        //x 좌표가 0 미만이면 제거
        if (a.x < 0) {
            o.splice(i, 1);
            console.log(o);
        }

        isCrash(dino, a);
        if (timer % 600 === 0) {
            speed++;
            console.log(speed);
        }
        a.x = a.x - speed;
        a.draw();
    });
    if (jumping) {
        dino.y -= 3;
        jumpTimer++;
    }
    if (!jumping) {
        // console.log(dino.y < window.innerHeight - 100);
        console.log(jumpTimer);
        // console.log(jumpTimer);
        if (dino.y < window.innerHeight - 100) dino.y += 3;
    }
    if (jumpTimer > 30) {
        jumping = false;
        jumpTimer = 0;
    }
    dino.draw();
}

프레임();

function isCrash(dino, cactus) {
    var x1 = cactus.x;
    var x2 = cactus.x + cactus.width;
    var y1 = cactus.y;
    var y2 = cactus.y + cactus.height;
    if (dino.x + dino.width > x1 && dino.x < x2) {
        if (dino.y < y2 && dino.y + dino.height > y1) cancelAnimationFrame(animation);
    }
}

var jumping = false;
document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
        jumping = true;
    }
});
document.addEventListener("touchstart", function (e) {
    jumping = true;
});
