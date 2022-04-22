var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var height = calcHeight();

function calcHeight() {
    if (window.innerHeight - 10 < 500) {
        return window.innerHeight - 10;
    } else {
        return 500;
    }
}
function randomNum(min, max) {
    var randNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randNum;
}
canvas.width = window.innerWidth - 10;
canvas.height = height;
var ending = document.getElementById("score");

var bugImg = new Image();
bugImg.src = "bug.png";
var dinoImg = new Image();
dinoImg.src = "dino.png";
var dino2Img = new Image();
dino2Img.src = "dino2.png";
var dino3Img = new Image();
dino3Img.src = "dino3.png";
var diaImg = new Image();
diaImg.src = "dia.png";
var dino = {
    x: 30,
    y: height - 50,
    width: 50,
    height: 50,
    draw() {
        ctx.drawImage(dinoImg, this.x, this.y, this.width, this.height);
    },
    draw2() {
        ctx.drawImage(dino2Img, this.x, this.y, this.width, this.height);
    },
    draw3() {
        ctx.drawImage(dino3Img, this.x, this.y, this.width, this.height);
    },
};

class Cactus {
    constructor() {
        this.x = canvas.width;
        this.y = randomNum(0, height - 50);
        this.width = 50;
        this.height = 50;
    }
    draw() {
        ctx.drawImage(bugImg, this.x, this.y, this.width, this.height);
    }
}
class Items {
    constructor() {
        this.x = canvas.width;
        this.y = randomNum(0, height - 50);
        this.width = 30;
        this.height = 30;
    }
    draw() {
        ctx.drawImage(diaImg, this.x, this.y, this.width, this.height);
    }
}

var content = document.getElementById("level");

var timer = 0;
var score = 0;
var level = 1;
var allCactus = [];
var allItems = [];
var jumpTimer = 0;
var animation;
var speed = 1;

var cactus = new Cactus();

function 프레임() {
    animation = requestAnimationFrame(프레임);
    timer++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var cactus = new Cactus();
    var items = new Items();

    if (timer % (240 / speed) === 0) {
        allCactus.push(cactus);
    }
    if (timer % randomNum(240, 300) === 0) {
        allItems.push(items);
    }

    allCactus.forEach((a, i, o) => {
        //x 좌표가 0 미만이면 제거
        if (a.x < 0) {
            o.splice(i, 1);
        }

        isCrash(dino, a, false);
        a.x = a.x - speed;
        a.draw();
    });
    allItems.forEach((a, i, o) => {
        isCrash(dino, a, i);
        if (isCrash(dino, a, i) === i) {
            o.splice(i, 1);
            score++;
            if (score % 5 === 0) level++;
            content.innerHTML = level;
        } else if (a.x < 0) {
            o.splice(i, 1);
        }
        a.x = a.x - speed;
        a.draw();
    });
    if (timer % 1200 === 0) {
        speed++;
    }
    if (jumping) {
        if (dino.y < 0) {
            jumping = false;
        }
        dino.y -= 3;
        jumpTimer++;
    }
    if (!jumping) {
        if (dino.y < height - 100) dino.y += 3;
    }
    if (jumpTimer > 30) {
        jumping = false;
        jumpTimer = 0;
    }
    if (level === 1) dino.draw();
    if (level === 2) dino.draw2();
    if (level > 2) dino.draw3();
}

프레임();

function isCrash(dino, cactus, isItem) {
    var x1 = cactus.x;
    var x2 = cactus.x + cactus.width;
    var y1 = cactus.y;
    var y2 = cactus.y + cactus.height;

    if (dino.x + dino.width > x1 && dino.x < x2) {
        if (dino.y < y2 && dino.y + dino.height > y1) {
            if (isItem === false) {
                cancelAnimationFrame(animation);
                ending.style.height = height + "px";
                ending.style.width = canvas.width + "px";
                ending.style.display = "block";
                document.getElementById("myscore").innerHTML = score + "점";
            } else {
                return isItem;
            }
        }
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

function retry() {
    ending.style.display = "none";
    timer = 0;
    score = 0;
    level = 1;
    allCactus = [];
    allItems = [];
    jumpTimer = 0;
    animation;
    speed = 1;
    프레임();
}
