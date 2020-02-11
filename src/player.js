import Ball from './ball';

export default class Player {
    constructor(name, ord) {
       this.name = name;
       this.ord = ord;
       this.posX = ord === 1 ? 100 : 400;
       this.swapped = false;

       this.balls = [];
       this.createBalls();
       this.currentBall = this.balls[0];

       this.createBalls = this.createBalls.bind(this);
       this.shuffle = this.shuffle.bind(this);
       this.selectNewBall = this.selectNewBall.bind(this);
       this.lost = this.lost.bind(this);
    }

    createBalls() {
        const colors = ['red', 'blue', 'green', 'yellow'];

        for (let i = 0; i < 4; i++) {
            const color = colors[i];
            const ball = new Ball(color, this.posX);
            this.balls.push(ball);
        }

        this.balls = this.shuffle(this.balls);
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    step() {
        this.currentBall.step();
    }

    draw(ctx) {
        ctx.fillStyle = "#000";
        ctx.font = "20px Arial";
        ctx.fillText(`Player ${this.ord}`, this.posX - 10, 300);

        this.balls.forEach((ball, i) => {
            const color = ball.health <= 0 ? '#000' : ball.color;
            const posX = (this.posX - 40) + (i * 45);

            ctx.beginPath();
            ctx.arc(posX, 350, 20, 0, 2 * Math.PI, false);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#000";
            ctx.stroke();
            ctx.fillStyle = "#000";
            ctx.font = "10px Arial";
            ctx.fillText(ball.health, posX - 8, 353);
        });

        this.currentBall.draw(ctx);
    }

    selectNewBall() {
        this.balls.forEach(ball => {
            if (ball.health > 0) {
                this.currentBall = ball;
            }
        })
    }

    lost() {
        let lost = true;

        this.balls.forEach(ball => {
            if (ball.health > 0) {
                lost = false;
            }
        })

        return lost;
    }
}