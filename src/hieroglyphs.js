import Square from "./square";
import { getRandomNumber } from "./utils";
import { SQUARE_SIDE } from "./constants";

class Hieroglyphs {
    grid = [];
    orients = [];
    countX;
    countY;
    periodX;
    periodY;

    constructor() {
        this.init();
        this.animate();

        window.addEventListener("click", this.init.bind(this));
        window.addEventListener("resize", this.init.bind(this));
    }

    init() {
        const color = `hsl(${getRandomNumber(0, 360)}, 100%, 60%)`;

        const width = window.innerWidth;
        const height = window.innerHeight;

        this.countX = Math.ceil(width / SQUARE_SIDE);
        this.countY = Math.ceil(height / SQUARE_SIDE);

        this.periodX = getRandomNumber(5, 10, true);
        this.periodY = getRandomNumber(5, 10, true);

        const periods = [];

        this.orients = [];

        for (let y = 0; y < this.periodY; ++y) {
            const line = [];

            this.orients[y] = [];

            for (let x = 0; x < this.periodX; ++x) {
                line[x] = getRandomNumber(0, 12, true);
                this.orients[y][x] = { orient: 0, squares: [] };
            }

            periods[y] = line;
        }

        document.body.innerHTML = "";

        this.grid = [];

        for (let y = 0; y < this.countY; ++y) {
            this.grid[y] = [];

            for (let x = 0; x < this.countX; ++x) {
                let perX = (x + 2 * Math.floor(y / this.periodY)) % this.periodX;
                let perY = y % this.periodY;

                this.grid[y][x] = new Square(x, y, periods[perY][perX], color);
                this.orients[perY][perX].squares.push([x, y]);
            }
        }

        this.drawAll();
    }

    drawAll() {
        for (let y = 0; y < this.countY; ++y) {
            for (let x = 0; x < this.countX; ++x) {
                this.grid[y][x].draw();
            }
        }
    }

    animate() {
        for (let k = 0; k < 3; ++k) {
            let perX = getRandomNumber(0, this.periodX, true);
            let perY = getRandomNumber(0, this.periodY, true);
            let objOrient = this.orients[perY][perX];
            let newOrient = `rotate(${90 * ++objOrient.orient}deg)`;

            objOrient.squares.forEach((square) => {
                let carr = this.grid[square[1]][square[0]];
                carr.canvas.style.transform = newOrient;
            });
        }

        setTimeout(() => {
            this.animate();
        }, 3000);
    }
}

export default Hieroglyphs;
