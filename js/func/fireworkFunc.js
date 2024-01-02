import { Particle } from '../fragments/particle.js'; 
import { viewWidth, viewHeight } from '../canvas.js';
import Animation from '../Animation.js';
import { fragmentArr, fragmentActArr, fragmentActType } from '../fragments/fragment.js'; 
import { values } from '../util.js';
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

    // fragmentActType이 create 시 결정되어야 그 폭죽에 맞는 속도, 시간을 설정할 수 있다.
    const fragmentsIndex = Math.floor(Math.random() * fragmentActArr.length);
    const extractedFragmentActType = fragmentActArr[fragmentsIndex];
    // const extractedFragmentActType = 'shoot';

    // 불꽃 y 엔드 포인트
    let endPoint = extractedFragmentActType === fragmentActType.shoot 
        ? values.originShortEndPoint(viewHeight) 
        : values.originDefaultEndPoint(viewHeight);

    // 불꽃 속도
    let originDuration = extractedFragmentActType === fragmentActType.shoot
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
        extractedFragmentActType: extractedFragmentActType,
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
    const extractedFragmentActType = origin.extractedFragmentActType;

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
            const fragment = {
                fragmentPoint_X: originPoint_X,
                fragmentPoint_Y: endPoint,
                fragmentColor: originColor,
            }

            switch (extractedFragmentActType) {
                case fragmentActType.explode:
                    explode(fragment, fragmentActType.explode);
                    break;

                case fragmentActType.explodeWithFallingFragments:
                    explode(fragment, fragmentActType.explodeWithFallingFragments);
                    break;

                case fragmentActType.shoot:
                    shoot(fragment, fragmentActType.shoot);
                    break;

                default:
                    explode(fragment, fragmentActType.explode);
                    break;
            }
        }
    ) // new Particle()

    fragmentArr.push(particle);
    if(! Animation.isMove) requestAnimationFrame(Animation.move);
}

export { create, soar };