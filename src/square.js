import { SQUARE_SIDE, SMALL_RADIUS, MID_RADIUS, LARGE_RADIUS, LINE_THICKNESS } from "./constants";

class Square {
    constructor(x, y, type, color) {
        this.x = x;
        this.y = y;

        this.getTypeAndRotation(type);

        this.x0 = 0;
        this.x1 = this.x0 + SQUARE_SIDE;
        this.y0 = 0;
        this.y1 = this.y0 + SQUARE_SIDE;

        this.xm = (this.x0 + this.x1) / 2;
        this.ym = (this.y0 + this.y1) / 2;

        this.x13 = (this.x0 * 5 + this.x1 * 3) / 8;
        this.x23 = (this.x0 * 3 + this.x1 * 5) / 8;
        this.y13 = (this.y0 * 5 + this.y1 * 3) / 8;
        this.y23 = (this.y0 * 3 + this.y1 * 5) / 8;

        this.canvas = document.createElement("canvas");

        this.canvas.style.position = "absolute";
        this.canvas.style.left = x * SQUARE_SIDE + "px";
        this.canvas.style.top = y * SQUARE_SIDE + "px";
        this.canvas.width = SQUARE_SIDE;
        this.canvas.height = SQUARE_SIDE;

        document.body.appendChild(this.canvas);

        this.context = this.canvas.getContext("2d");

        this.context.linecap = "round";
        this.context.strokeStyle = color;
        this.context.lineWidth = LINE_THICKNESS;

        this.orient = 0;
    }

    getTypeAndRotation(type) {
        switch (type) {
            case 0:
                this.type = 0;
                this.rotation = 0;
                break;
            case 1:
            case 2:
                this.type = 1;
                this.rotation = type - 1;
                break;
            case 3:
            case 4:
                this.type = 2;
                this.rotation = type - 3;
                break;
            case 5:
            case 6:
            case 7:
            case 8:
                this.type = 3;
                this.rotation = type - 5;
                break;
            case 9:
            case 10:
            case 11:
            case 12:
                this.type = 4;
                this.rotation = type - 9;
                break;
        }
    }

    makeCorner(corner) {
        return [
            [this.x0, this.y0],
            [this.x1, this.y0],
            [this.x1, this.y1],
            [this.x0, this.y1],
        ][corner];
    }

    makeMid(board) {
        return [
            [this.xm, this.y0],
            [this.x1, this.ym],
            [this.xm, this.y1],
            [this.x0, this.ym],
        ][board];
    }

    makeTiers(board) {
        return [
            [this.x13, this.y0, this.x13, this.y1],
            [this.x1, this.y13, this.x0, this.y13],
            [this.x23, this.y1, this.x23, this.y0],
            [this.x0, this.y23, this.x1, this.y23],
        ][board];
    }

    makeTiers2(board) {
        return [
            [this.x23, this.y0, this.x23, this.y1],
            [this.x1, this.y23, this.x0, this.y23],
            [this.x13, this.y1, this.x13, this.y0],
            [this.x0, this.y13, this.x1, this.y13],
        ][board];
    }

    corner1(corner) {
        let [x, y] = this.makeCorner(corner);
        let dAng = corner * (Math.PI / 2);
        this.context.beginPath();
        this.context.arc(x, y, MID_RADIUS, 0 + dAng, Math.PI / 2 + dAng);
        this.context.stroke();
    }

    corner2(corner) {
        let [x, y] = this.makeCorner(corner);
        let dAng = corner * (Math.PI / 2);
        this.context.beginPath();
        this.context.arc(x, y, LARGE_RADIUS, 0 + dAng, Math.PI / 2 + dAng);
        this.context.stroke();
    }

    mid(board) {
        let [x, y] = this.makeMid(board);
        let dAng = board * (Math.PI / 2);
        this.context.beginPath();
        this.context.arc(x, y, SMALL_RADIUS, dAng, Math.PI + dAng);
        this.context.stroke();
    }

    vertical1(board) {
        let [x0, y0, x1, y1] = this.makeTiers(board);
        this.context.beginPath();
        this.context.moveTo(x0, y0);
        this.context.lineTo(x1, y1);
        this.context.stroke();
    }

    vertical2(board) {
        let [x0, y0, x1, y1] = this.makeTiers2(board);
        this.context.beginPath();
        this.context.moveTo(x0, y0);
        this.context.lineTo(x1, y1);
        this.context.stroke();
    }

    draw() {
        switch (this.type) {
            case 0:
                this.corner1(0);
                this.corner1(1);
                this.corner1(2);
                this.corner1(3);
                break;

            case 1:
                this.corner1(this.rotation);
                this.corner2(this.rotation);
                this.corner1(this.rotation ^ 2);
                this.corner2(this.rotation ^ 2);
                break;

            case 2:
                this.mid(this.rotation ^ 1);
                this.mid(this.rotation ^ 3);
                this.vertical1(this.rotation);
                this.vertical2(this.rotation);
                break;

            case 3:
                this.mid((this.rotation + 3) % 4);
                this.vertical1(this.rotation);
                this.corner1((this.rotation + 1) % 4);
                this.corner1(this.rotation ^ 2);
                break;

            case 4:
                this.corner1(this.rotation);
                this.corner2(this.rotation);
                this.mid((this.rotation + 1) % 4);
                this.mid(this.rotation ^ 2);
                break;
        }
    }
}

export default Square;
