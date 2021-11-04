const FIRSTPLAYERSCOREPATH = document.querySelector('.first-player-score');
const SECONDPLAYERSCOREPATH = document.querySelector('.second-player-score');
var firstPlayerScore = 0;
var secondPlayerScore = 0;
const PINGPONGMAIN = document.querySelector('.pingpong__main');

const PingPongMainTopPosition = PINGPONGMAIN.getBoundingClientRect().top;
const PingPongMainRightPosition = PINGPONGMAIN.getBoundingClientRect().right;
const PingPongMainBottomPosition = PINGPONGMAIN.getBoundingClientRect().bottom;
const PingPongMainLeftPosition = PINGPONGMAIN.getBoundingClientRect().left;

class Player {
    constructor(info) {
        this.score = info.score;
        this.y = info.y;
        this.path = info.path;
    }

    movePlayer(x) {
        this.y += x * 50;

        if (this.y >= 140) {
            this.y = 140;
        } else if (this.y <= -140) {
            this.y = -140;
        }

        this.path.style.transform = `translateY(${this.y}px)`;
    }
}

var first = new Player({
    score: 0,
    y: 0,
    path: document.querySelector('.first-player')
});
var second = new Player({
    score: 0,
    y: 0,
    path: document.querySelector('.second-player')
});

var sideX = 1;
var sideY = 1;

class Ball {
    constructor(info) {
        this.onload();
        this.speedX = info.speedX;
        this.speedY = info.speedY;
        this.path = info.path;

        this.stepX = sideX * this.speedX;
        this.stepY = sideY * this.speedY;

        this.x = this.stepX;
        this.y = this.stepY;

    }

    onload() {
        if (Math.random() < 0.5) {
            sideX = -1;
        } else {
            sideX = 1;
        }
    }

    moveBall() {
        if (this.path.getBoundingClientRect().right >= PingPongMainRightPosition ||
            this.path.getBoundingClientRect().left <= PingPongMainLeftPosition) {
            this.onload();
            this.x = 0;
            this.y = 0;
        }

        if (this.path.getBoundingClientRect().right >= PingPongMainRightPosition) {
            firstPlayerScore++;
            FIRSTPLAYERSCOREPATH.innerHTML = firstPlayerScore;
        }

        if (this.path.getBoundingClientRect().left <= PingPongMainLeftPosition) {
            secondPlayerScore++;
            SECONDPLAYERSCOREPATH.innerHTML = secondPlayerScore;
        }

        if (this.path.getBoundingClientRect().top <= PingPongMainTopPosition ||
            this.path.getBoundingClientRect().bottom >= PingPongMainBottomPosition) {
            this.stepY = -this.stepY;
        }

        if (this.path.getBoundingClientRect().left <= PingPongMainLeftPosition + 50 &&
            first.path.getBoundingClientRect().top <= this.path.getBoundingClientRect().bottom &&
            first.path.getBoundingClientRect().bottom >= this.path.getBoundingClientRect().top) {
            this.stepX = -this.stepX;
        }

        if (this.path.getBoundingClientRect().right + 50 >= PingPongMainRightPosition &&
            second.path.getBoundingClientRect().top <= this.path.getBoundingClientRect().bottom &&
            second.path.getBoundingClientRect().bottom >= this.path.getBoundingClientRect().top) {
            this.stepX = -this.stepX;
        }

        this.x += this.stepX;
        this.y += this.stepY;

        this.path.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}

var ball = new Ball({
    speedX: 6,
    speedY: 6,
    path: document.querySelector('.pingpong__ball')
});

document.onkeydown = (e) => {
    if (e.keyCode == '65') {
        first.movePlayer(1);
    }
    if (e.keyCode == '81') {
        first.movePlayer(-1);
    }
    if (e.keyCode == '40') {
        second.movePlayer(1);
    }
    if (e.keyCode == '38') {
        second.movePlayer(-1);
    }
    if (e.keyCode == '32') {
        update();
    }
}

function update() {
    setTimeout(() => {
        ball.moveBall();
    }, 0);
    setTimeout(() => {
        requestAnimationFrame(() => {
            update()
        });
    }, 0);
};