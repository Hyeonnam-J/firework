import { Particle, particles } from './particle.js';
import { viewWidth, viewHeight } from './canvas.js';
import Animation from './Animation.js';
import { fragmentsArr, fragmentsType } from './fragments.js';
import { values } from './util.js';
import { explode } from './explodeFunc.js';
import { shoot } from './shootFunc.js';

// y 시작점은 항상 동일
const originPoint_Y = viewHeight;

function create() {
    // 불꽃 크기
    const originWidth = values.originWidth;
    const originHeight = values.originHeight;

    // 불꽃 색
    const originColor = values.originColor();

    // 불꽃 x 스타팅 포인트
    const originPoint_X = values.originPoint_X(viewWidth);

    // fragmentsType이 create 시 결정되어야 그 폭죽에 맞는 속도, 시간을 설정할 수 있다.
    const fragmentsIndex = Math.floor(Math.random() * fragmentsArr.length);
    const extractedFragmentsType = fragmentsArr[fragmentsIndex];
    // const extractedFragmentsType = 'shoot';

    // 불꽃 y 엔드 포인트
    let endPoint = extractedFragmentsType === fragmentsType.shoot 
        ? values.originShortEndPoint(viewHeight) 
        : values.originDefaultEndPoint(viewHeight);

    // 불꽃 속도
    let originDuration = extractedFragmentsType === fragmentsType.shoot
        ? values.originShortDuration()
        : values.originDefaultDuration();

    const origin = {
        originWidth: originWidth,
        originHeight: originHeight,
        originColor: originColor,
        originPoint_X: originPoint_X,
        originPoint_Y: originPoint_Y,
        endPoint: endPoint,
        originDuration: originDuration,
        extractedFragmentsType: extractedFragmentsType,
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
    const extractedFragmentsType = origin.extractedFragmentsType;

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

            switch (extractedFragmentsType) {
                case fragmentsType.explode:
                    explode(fragments, fragmentsType.explode);
                    break;

                case fragmentsType.explodeWithFallingDust:
                    explode(fragments, fragmentsType.explodeWithFallingDust);
                    break;

                case fragmentsType.shoot:
                    shoot(fragments, fragmentsType.shoot);
                    break;

                default:
                    explode(fragments, fragmentsType.explode);
                    break;
            }
        }
    ) // new Particle()

    particles.push(particle);
    if(! Animation.isMove) requestAnimationFrame(Animation.move);
}

export { create, soar };