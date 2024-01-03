import Particle from '../fragments/Particle.js';
import { viewWidth, viewHeight } from '../canvas.js';
import Animation from '../Animation.js';
import Utils from '../Utils.js';
import { explode } from './explodeFunc.js';
import { shoot } from './shootFunc.js';
import Fragment from '../fragments/fragment.js';

// y 시작점은 항상 동일
const start_y = viewHeight;

function fire(start_x, end_y, duration, color, extractedfragmentsActType) {
    // 위로 솟아오르기만 해야 해서,
    const end_x = start_x;

    // 불꽃 크기
    const originWidth = Utils.values.originWidth;
    const originHeight = Utils.values.originHeight;

    const particle = new Particle(
        start_x,
        start_y,
        end_x,
        end_y,
        originWidth,
        originHeight,
        duration,
        color,
        0,
        () => {
            // callback
            const origin = {
                x: start_x,
                y: end_y,
                color: color,
            }

            switch (extractedfragmentsActType) {
                case Fragment.fragmentsActType.explode:
                    explode(origin, Fragment.fragmentsActType.explode);
                    break;

                case Fragment.fragmentsActType.explodeWithFallingParticles:
                    explode(origin, Fragment.fragmentsActType.explodeWithFallingParticles);
                    break;

                case Fragment.fragmentsActType.shoot:
                    shoot(origin, Fragment.fragmentsActType.shoot);
                    break;

                default:
                    shoot(origin, Fragment.fragmentsActType.shootWithFallingParticles);
                    break;
            }
        }
    ) // new Particle()

    Fragment.fragmentArr.push(particle);
    if (!Animation.isMove) requestAnimationFrame(Animation.move);
}


export { fire };