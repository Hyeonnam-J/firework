import { Particle, particles } from './particle.js';
import { viewWidth, viewHeight, body, canvas, ctx } from './canvas.js';
import { move } from './animate.js';
import { explosionArr, explosionType } from './explosion.js';
import { calculateCoordinates } from './util.js';

// y 시작점은 항상 동일
const originPoint_Y = viewHeight;

function create() {
    // 불꽃 크기
    const originWidth = Math.floor(Math.random()) + 2;
    const originHeight = originWidth * 40;

    // 불꽃 속도
    const originDuration = Math.random() * 2 + 1;

    // 불꽃 색
    const originColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

    // 불꽃 x 스타팅 포인트
    const originPoint_X = Math.floor(Math.random() * viewWidth) - originWidth / 2;

    // 불꽃 y 엔드 포인트
    const endPoint = ((Math.random() * 0.4) + 0.2) * viewHeight;

    const origin = {
        originWidth: originWidth,
        originHeight: originHeight,
        originColor: originColor,
        originPoint_X: originPoint_X,
        originPoint_Y: originPoint_Y,
        endPoint: endPoint,
        originDuration: originDuration,
    }

    return origin;
}

function soar(origin) {
    const originWidth = origin.originWidth;
    const originHeight = origin.originHeight;
    const originColor = origin.originColor;
    const originPoint_X = origin.originPoint_X;
    const originPoint_Y = origin.originPoint_Y;
    const endPoint = origin.endPoint;
    const originDuration = origin.originDuration;

    const particle = new Particle(
        originPoint_X,
        originPoint_Y,
        originPoint_X,
        endPoint,
        originWidth,
        originHeight,
        originDuration,
        originColor,
        0,
        () => {
            // callback
            const fragments = {
                fragmentsPoint_X: originPoint_X,
                fragmentsPoint_Y: endPoint,
                fragmentsColor: originColor,
            }

            const explosionIndex = Math.floor(Math.random() * explosionArr.length);
            // const explosionType = explosionArr[explosionIndex];
            const explosionType = 'explode'

            switch (explosionType) {
                case explosionType.explode:
                    explode(fragments);
                    break;

                case explosionType.twinkle:
                    twinkle(fragments);
                    break;

                default:
                    explode(fragments);
                    break;
            }
        }
    ) // new Particle()

    particles.push(particle);
    requestAnimationFrame(move);
}

function explode(fragments) {
    const fragmentsPoint_X = fragments.fragmentsPoint_X;
    const fragmentsPoint_Y = fragments.fragmentsPoint_Y;
    const fragmentsColor = fragments.fragmentsColor;
    const fragmentsWidth = Math.floor(Math.random()) + 2;
    const fragmentsHeight = fragmentsWidth * 10;
    const fragmentsDuration = Math.random() + 1.5;
    const fragmentsMaxDistance = Math.random() * 100 + 50;

    let angle = 0;
    while(angle < 360){
        angle += Math.floor( (Math.random() * 10) + 5 );
        const fragmentsEndPoint = calculateCoordinates(
            fragmentsPoint_X,
            fragmentsPoint_Y,
            fragmentsMaxDistance / Math.floor( (Math.random() * 5) + 1),
            angle - 90  // ctx.rotate() 시, 진행 방향과 머리 방향 일치를 위해.
        );

        const particle = new Particle(
            fragmentsPoint_X,
            fragmentsPoint_Y,
            fragmentsEndPoint.x,
            fragmentsEndPoint.y,
            fragmentsWidth,
            fragmentsHeight,
            fragmentsDuration,
            fragmentsColor,
            angle,
            () => {

            }
        );
        particles.push(particle);
    }

    requestAnimationFrame(move);
}

export { create, soar, explode };