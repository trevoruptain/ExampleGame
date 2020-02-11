export default class Ball {
    constructor(color, posX) {
        this.color = color;
        this.posX = posX;
        this.posY = 150;
        this.vel = Math.random() + 1;
        this.radius = 50;
        this.health = 100;
        this.attackStrength = 0; 
        this.direction = 'up';
    }

    step() {
        if (this.direction === 'up') {
            this.posY -= this.vel;
            if (this.posY <= 100) this.direction = 'down';
        } else {
            this.posY += this.vel;
            if (this.posY >= 150) this.direction = "up";
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.posX + 25, this.posY, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000';
        ctx.stroke();
        ctx.fillStyle = '#000';
        ctx.font = "30px Arial";
        ctx.fillText(this.health, this.posX, this.posY + 10);
    }
}