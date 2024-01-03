import Particle from '../fragments/Particle.js';
import Animation from '../Animation.js';
import Utils from '../Utils.js';
import { burst } from './burstFunc.js';
import { shoot } from './shootFunc.js';
import Fragment from '../fragments/fragment.js';

function fire(color, fragmentsActType, soaring, explosion) {
    const particle = new Particle(
        soaring.start_x,
        soaring.start_y,
        soaring.end_x,
        soaring.end_y,
        soaring.width,
        soaring.height,
        soaring.duration,
        color,
        0,
        () => {
            // callback
            const origin = {
                x: soaring.end_x,
                y: soaring.end_y,
                color: color,
            }

            switch (fragmentsActType) {
                case Fragment.fragmentsActType.burst:
                    burst(origin, explosion, Fragment.fragmentsActType.burst);
                    break;

                case Fragment.fragmentsActType.burstWithFallingParticles:
                    burst(origin, explosion, Fragment.fragmentsActType.burstWithFallingParticles);
                    break;

                case Fragment.fragmentsActType.shoot:
                    shoot(origin, explosion, Fragment.fragmentsActType.shoot);
                    break;

                case Fragment.fragmentsActType.shootWithFallingParticles:
                    shoot(origin, explosion, Fragment.fragmentsActType.shootWithFallingParticles);
                    break;

                default:
                    break;
            }
        }
    ) // new Particle()

    Fragment.fragmentArr.push(particle);
    if (!Animation.isMove) requestAnimationFrame(Animation.move);
}


export { fire };