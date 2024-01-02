import { Particle, particles } from './particle.js';
import { calculateCoordinates, values } from './util.js';
import { move } from './animate.js';

function explode(fragments) {
    generateExplosionFragments(fragments, 0, 24, 1);
    generateExplosionFragments(fragments, 2, 23, 0.98);
    generateExplosionFragments(fragments, 3, 25, 0.95);

    generateExplosionFragments(fragments, 7, 13, 0.9);
    generateExplosionFragments(fragments, 10, 16, 0.86);
    generateExplosionFragments(fragments, 11, 18, 0.87);

    generateExplosionFragments(fragments, 0, 20, 0.8);
    generateExplosionFragments(fragments, 6, 21, 0.89);
    generateExplosionFragments(fragments, 5, 24, 0.87);

    generateExplosionFragments(fragments, 1, 24, 0.7);
    generateExplosionFragments(fragments, 9, 26, 0.69);
    generateExplosionFragments(fragments, 8, 29, 0.67);

    generateExplosionFragments(fragments, 2, 23, 0.6);
    generateExplosionFragments(fragments, 8, 21, 0.68);
    generateExplosionFragments(fragments, 3, 22, 0.65);

    generateExplosionFragments(fragments, 4, 30, 0.5);
    generateExplosionFragments(fragments, 7, 31, 0.44);
    generateExplosionFragments(fragments, 5, 32, 0.45);

    generateExplosionFragments(fragments, 3, 36, 0.4);
    generateExplosionFragments(fragments, 1, 38, 0.39);
    generateExplosionFragments(fragments, 9, 37, 0.38);

    requestAnimationFrame(move);
}

function generateExplosionFragments(fragments, startAngle, angleGap, distancePercentage){
    const fragmentsPoint_X = fragments.fragmentsPoint_X;
    const fragmentsPoint_Y = fragments.fragmentsPoint_Y;
    const fragmentsColor = fragments.fragmentsColor;
    const fragmentsWidth = values.fragmentsWidth;
    const fragmentsHeight = values.fragmentsHeight;
    const fragmentsDuration = values.fragmentsDuration();
    const fragmentsDistance = values.fragmentsDistance();

    for(let angle = startAngle; angle < 360; angle += angleGap){
        const fragmentsEndPoint = calculateCoordinates(
            fragmentsPoint_X,
            fragmentsPoint_Y,
            fragmentsDistance * distancePercentage,
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
}

export { explode };