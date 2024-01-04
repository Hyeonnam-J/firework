import { ctx } from '../canvas.js';
import Utils from '../Utils.js';
import Fragment from './fragment.js';

export default class Trace {
    constructor(x, y, color) {
        this.startTime = performance.now();

        this.x = x;
        this.y = y;
        this.color = color;

        this.width = 1;
        this.height = 1;
        this.duration = 2000;
    }

    update() {
        const currentTime = performance.now();
        const elapsed = currentTime - this.startTime;
        this.progress = Math.min(elapsed / this.duration, 1);
    }

    draw() {
        if (this.progress >= 1) {

            // 현재 Particle 객체를 fragmentArr 배열에서 찾아서 삭제
            const index = Fragment.fragmentArr.indexOf(this);
            Fragment.fragmentArr.splice(index, 1);

            return;
        }

        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.3;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}