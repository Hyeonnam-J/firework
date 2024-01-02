import { Particle, particles } from './particle.js';
import { viewWidth, viewHeight, body, canvas, ctx } from './canvas.js';
import Animation from './Animation.js';
import { fragmentsArr, fragmentsType } from './fragments.js';
import { values } from './util.js';
import { explode } from './explodeFunc.js';

// y 시작점은 항상 동일
const originPoint_Y = viewHeight;

function create() {
    // 불꽃 크기
    const originWidth = values.originWidth;
    const originHeight = values.originHeight;

    // 불꽃 속도
    const originDuration = values.originDuration();

    // 불꽃 색
    const originColor = values.originColor();

    // 불꽃 x 스타팅 포인트
    const originPoint_X = values.originPoint_X(viewWidth);

    // 불꽃 y 엔드 포인트
    const endPoint = values.endPoint(viewHeight);

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

            const fragmentsIndex = Math.floor(Math.random() * fragmentsArr.length);
            // const fragmentsType = fragmentsArr[fragmentsIndex];
            const fragmentsType = 'explode'

            switch (fragmentsType) {
                case fragmentsType.explode:
                    explode(fragments);
                    break;

                case fragmentsType.twinkle:
                    twinkle(fragments);
                    break;

                default:
                    explode(fragments);
                    break;
            }
        }
    ) // new Particle()

    particles.push(particle);
    if(! Animation.isMove) requestAnimationFrame(Animation.move);
}


export { create, soar };