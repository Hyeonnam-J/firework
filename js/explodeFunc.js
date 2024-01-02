import { Particle, particles } from './particle.js';
import { calculateCoordinates, values } from './util.js';
import { move } from './animate.js';

function explode(fragments) {
    const fragmentsPoint_X = fragments.fragmentsPoint_X;
    const fragmentsPoint_Y = fragments.fragmentsPoint_Y;
    const fragmentsColor = fragments.fragmentsColor;
    const fragmentsWidth = values.fragmentsWidth;
    const fragmentsHeight = values.fragmentsHeight;
    const fragmentsDuration = values.fragmentsDuration();
    const fragmentsDistance = values.fragmentsDistance();

    for(let angle = 0; angle < 360; angle += 15){
        const fragmentsEndPoint = calculateCoordinates(
            fragmentsPoint_X,
            fragmentsPoint_Y,
            fragmentsDistance,
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

    for(let angle = 7; angle < 360; angle += 15){
        const fragmentsEndPoint = calculateCoordinates(
            fragmentsPoint_X,
            fragmentsPoint_Y,
            fragmentsDistance * 0.7,
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

export { explode };