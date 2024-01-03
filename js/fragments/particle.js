import { ctx } from '../canvas.js';
import Trace from './Trace.js';
import Fragment from './fragment.js';
import Animation from '../Animation.js';
import Utils from '../Utils.js';

export default class Particle {
    constructor(startX, startY, endX, endY, objectWidth, objectHeight, milliseconds, objectColor, angle, 
        onComplete = () => {},
        isTrace = true
    ) {
        this.milliseconds = milliseconds;
        this.startTime = performance.now();

        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.objectWidth = objectWidth;
        this.objectHeight = objectHeight;
        this.objectColor = objectColor;
        this.angle = angle;
        this.onComplete = onComplete;
        this.isTrace = isTrace;

        this.traceCount = 0;
    }

    update() {
        const currentTime = performance.now();
        const elapsed = currentTime - this.startTime;
        this.progress = Math.min(elapsed / this.milliseconds, 1);

        const easingFactor = this.easeInOutQuad(this.progress);

        this.currentX = this.startX + (this.endX - this.startX) * easingFactor;
        this.currentY = this.startY + (this.endY - this.startY) * easingFactor;
    }

    easeInOutQuad(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    draw() {
        if (this.progress >= 1) {
            this.onComplete();

            // 현재 Particle 객체를 fragmentArr 배열에서 찾아서 삭제
            const index = Fragment.fragmentArr.indexOf(this);
            Fragment.fragmentArr.splice(index, 1);

            return;
        }

        ctx.save();

        // 그라디언트 생성
        const gradient = ctx.createLinearGradient(this.currentX, this.currentY, this.currentX + this.objectWidth, this.currentY + this.objectHeight);
        gradient.addColorStop(0, this.objectColor); // 시작 부분
        gradient.addColorStop(1, 'transparent');    // 끝 부분 (transparent는 투명 색)
        ctx.fillStyle = gradient;

        // opacity
        ctx.globalAlpha = 1 - this.progress;

        ctx.translate(this.currentX + this.objectWidth / 2, this.currentY + this.objectHeight / 2); // 입자 중심으로 이동
        ctx.rotate( (Math.PI * this.angle) / 180 );
        ctx.translate(-(this.currentX + this.objectWidth / 2), -(this.currentY + this.objectHeight / 2)); // 원래 위치로 이동
        
        ctx.fillRect(this.currentX, this.currentY, this.objectWidth, this.objectHeight);

        ctx.restore();

        if(this.isTrace){
            this.traceCount ++;
            if(this.traceCount === 10){
                this.traceCount = 0;

                const trace = new Trace(
                    this.currentX,
                    this.currentY,
                    Utils.values.traceSize,
                    Utils.values.traceSize,
                    this.objectColor
                );
        
                Fragment.fragmentArr.push(trace);
                if(! Animation.isMove) requestAnimationFrame(Animation.move);
            }
        }   // if(this.isTrace){
    }
}