import Particle from '../fragments/Particle.js';
import Animation from '../Animation.js';
import { burst } from './burst.js';
import { erupt } from './erupt.js';
import Fragment from '../fragments/Fragment.js';
import { bomb } from './bomb.js';

function fire(color, fragmentsActType, soaring, explosion) {
    const soaringParticlesWidth = 2.5;
    const soaringParticlesHeight = 80;

    const particle = new Particle(
        Particle.state.soar,
        fragmentsActType,
        soaring.start_x,
        soaring.start_y,
        soaring.end_x,
        soaring.end_y,
        soaringParticlesWidth,
        soaringParticlesHeight,
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

                case Fragment.fragmentsActType.burstWithTwinkle:
                    burst(origin, explosion, Fragment.fragmentsActType.burstWithTwinkle);
                    break;

                case Fragment.fragmentsActType.singleErupt:
                    erupt(origin, explosion, Fragment.fragmentsActType.singleErupt);
                    break;

                case Fragment.fragmentsActType.doubleErupt:
                    erupt(origin, explosion, Fragment.fragmentsActType.doubleErupt);
                    break;

                case Fragment.fragmentsActType.tripleErupt:
                    erupt(origin, explosion, Fragment.fragmentsActType.tripleErupt);
                    break;

                case Fragment.fragmentsActType.bomb_olympic:
                    bomb(origin, explosion, Fragment.fragmentsActType.bomb_olympic);
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