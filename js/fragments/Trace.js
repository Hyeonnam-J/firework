import { ctx } from '../canvas.js';
import Utils from '../Utils.js';
import Fragment from './fragment.js';

export default class Trace {
    constructor(x, y, objectWidth, objectHeight, objectColor) {
        this.startTime = performance.now();

        this.x = x;
        this.y = y;
        this.objectWidth = objectWidth;
        this.objectHeight = objectHeight;
        this.objectColor = objectColor;
    }

    update() {
        const currentTime = performance.now();
        const elapsed = currentTime - this.startTime;
        this.progress = Math.min(elapsed / Utils.values.traceDuration, 1);
    }

    draw() {
        if (this.progress >= 1) {

            // 현재 Particle 객체를 fragmentArr 배열에서 찾아서 삭제
            const index = Fragment.fragmentArr.indexOf(this);
            Fragment.fragmentArr.splice(index, 1);

            return;
        }

        ctx.fillStyle = this.objectColor;
        ctx.globalAlpha = 0.5;
        ctx.fillRect(this.x, this.y, this.objectWidth, this.objectHeight);
    }
}