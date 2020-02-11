import Player from "./player";

export default class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.players = [];
        this.currentPlayer = 1;
        this.choseSwitch = false;

        this.createPlayers();
        this.animate();
        this.bindEventHandlers();

        this.animate = this.animate.bind(this);
        this.drawPlayerOptions = this.drawPlayerOptions.bind(this);
        this.handleBallSelect = this.handleBallSelect.bind(this);
        this.handleOptionSelect = this.handleOptionSelect.bind(this);
        this.swapBall = this.swapBall.bind(this);
        this.handleAttack = this.handleAttack.bind(this);
        this.swapPlayers = this.swapPlayers.bind(this);
        this.finishTurn = this.finishTurn.bind(this);
        this.calculateDamage = this.calculateDamage.bind(this);
    }

    createPlayers() {
        const player1 = new Player('Ash Ketchum', 1);
        const player2 = new Player('Misty', 2);

        this.players.push(player1);
        this.players.push(player2);
    }

    animate() {
        this.ctx.clearRect(0, 0, 500, 700);

        this.drawPlayerOptions();

        this.players.forEach(player => {
            player.step();
            player.draw(this.ctx);
        });

        requestAnimationFrame(this.animate.bind(this));
    }

    drawPlayerOptions() {
        this.ctx.fillStyle = "#000";
        this.ctx.font = "20px Arial";
        this.ctx.fillText(`Player ${this.currentPlayer}'s Turn:`, 200, 450);
        this.ctx.fillText(`Attack`, 120, 540);
        this.ctx.fillText(`Switch`, 370, 540);

        this.ctx.beginPath();
        this.ctx.rect(50, 500, 200, 70);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.rect(300, 500, 200, 70);
        this.ctx.stroke();
    }

    bindEventHandlers() {
        const canvas = document.getElementById('canvas');

        canvas.addEventListener('click', e => {
            const [x, y] = [e.x, e.y];

            if (y >= 340 && y <= 380) {
                this.handleBallSelect(x);
            } else if (y >= 510 && y <= 580) {
                this.handleOptionSelect(x);
            }
        })
    }

    handleBallSelect(x) {
        if (x > 290 && this.currentPlayer === 1 || x < 290 && this.currentPlayer === 2) return;

        const ballMap = {
            47: 0,
            93: 1, 
            139: 2,
            183: 3,
            347: 0,
            393: 1,
            438: 2,
            484: 3
        }

        let selectedBall;

        Object.keys(ballMap).forEach(ballX => {
            if (x >= ballX && x <= ballX + 40) {
              selectedBall = ballMap[ballX];
            }
        });

        this.swapBall(selectedBall);
    }

    handleOptionSelect(x) {
        if (x >= 58 && x <= 256) {
            this.handleAttack();
        } else if (x >= 308 && x <= 508) {
            alert('Choose a ball');
            this.choseSwitch = true;
        }
    }

    swapBall(selectedBall) {
        const currentPlayer = this.players[this.currentPlayer - 1];

        if (this.choseSwitch) {
            currentPlayer.currentBall = currentPlayer.balls[selectedBall];
            currentPlayer.swapped = true;
            this.choseSwitch = false;

            if (this.currentPlayer === 2) {
              this.finishTurn();
            }

            this.swapPlayers();
        }
    }

    handleAttack() {
        const currentPlayer = this.players[this.currentPlayer - 1];
        currentPlayer.currentBall.attackStrength = Math.floor(Math.random() * 70) + 10;

        if (this.currentPlayer === 2) {
            this.finishTurn();  
        } 

        this.swapPlayers();
    }

    swapPlayers() {
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    }

    finishTurn() {
        const [player1, player2] = this.players;

        if (player1.swapped && !player2.swapped) {
            this.calculateDamage(player2, player1);
        } else if (!player1.swapped && player2.swapped) {
            this.calculateDamage(player1, player2)
        } else if (!player1.swapped && !player2.swapped) {
            // Choose random winner 
            const randomPlayer = Math.floor(Math.random() * 2);
            const otherPlayer = randomPlayer === 0 ? 1 : 0;
            const winnerOfRound = this.players[randomPlayer];
            const loserOfRound = this.players[otherPlayer];

            this.calculateDamage(winnerOfRound, loserOfRound)
        }

        this.players.forEach(player => {
            player.swapped = false;

            if (player.lost()) {
                const winner = player.ord === 1 ? 2 : 1;
                alert(`Player ${winner} wins!`);
            }
        });

    }

    calculateDamage(winner, loser) {
        let nextHealth = loser.currentBall.health - winner.currentBall.attackStrength;
        nextHealth = nextHealth < 0 ? 0 : nextHealth;
        loser.currentBall.health = nextHealth;

        if (loser.currentBall.health === 0) {
            loser.selectNewBall();
        }
    }
}