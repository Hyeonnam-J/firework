import { ctx, viewHeight } from '../canvas.js';
import Trace from './Trace.js';
import Fragment from './Fragment.js';
import Animation from '../Animation.js';
import Utils from '../Utils.js';

export default class Particle {
    static state = {
        soar: 'soar',
        explode: 'explode',
        flutter: 'flutter',
    }

    constructor(state, fragmentsActType, startX, startY, endX, endY, width, height, milliseconds, color, angle, 
        onComplete = () => {}
    ) {
        this.state = state;
        this.fragmentsActType = fragmentsActType;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.width = width;
        this.height = height;
        this.color = color;
        this.angle = angle;
        this.onComplete = onComplete;

        this.milliseconds = milliseconds;
        this.startTime = performance.now();

        this.isTrace = state === Particle.state.soar ? true : false;
        this.traceCount = 0;
    }

    update() {
        const currentTime = performance.now();
        const elapsed = currentTime - this.startTime;
        this.progress = Math.min(elapsed / this.milliseconds, 1);

        const easingFactor = this.easeInOutQuad(this.progress);

        this.currentX = this.startX + (this.endX - this.startX) * easingFactor;
        this.currentY = this.startY + (this.endY - this.startY) * easingFactor;

        this.modifyCoordinates();
    }

    modifyCoordinates(){
        if(this.state === Particle.state.explode && this.fragmentsActType === Fragment.fragmentsActType.erupt){
            this.endY += Utils.frameGravity.light;
        }
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
        const gradient = ctx.createLinearGradient(this.currentX, this.currentY, this.currentX + this.width, this.currentY + this.height);
        gradient.addColorStop(0, this.color); // 시작 부분
        gradient.addColorStop(1, 'transparent');    // 끝 부분 (transparent는 투명 색)
        ctx.fillStyle = gradient;

        // opacity
        ctx.globalAlpha = this.getOpacity();
        
        ctx.translate(this.currentX + this.width / 2, this.currentY + this.height / 2); // 입자 중심으로 이동
        ctx.rotate( (Math.PI * this.angle) / 180 );
        ctx.translate(-(this.currentX + this.width / 2), -(this.currentY + this.height / 2)); // 원래 위치로 이동
        
        ctx.fillRect(this.currentX, this.currentY, this.width, this.height);

        ctx.restore();

        if(this.isTrace){
            this.traceCount ++;
            if(this.traceCount === 5){
                this.traceCount = 0;

                const trace = new Trace(
                    this.currentX,
                    this.currentY,
                    this.color
                );

                Fragment.fragmentArr.push(trace);
                if(! Animation.isMove) requestAnimationFrame(Animation.move);
            }
        }   // if(this.isTrace){
    }   // draw()

    getOpacity(){
        if(this.state === Particle.state.flutter && this.fragmentsActType === Fragment.fragmentsActType.burstWithTwinkle) return ctx.globalAlpha = Math.random();
        return ctx.globalAlpha = 1 - this.progress;
    }
}