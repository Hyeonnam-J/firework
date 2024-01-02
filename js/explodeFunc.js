import { Particle, particles } from './particle.js';
import { calculateCoordinates, values } from './util.js';
import Animation from './Animation.js';

function explode(fragments) {
    generateExplosionFragments(fragments, 1, 15, 0.99);
    generateExplosionFragments(fragments, 2, 15, 0.99);
    generateExplosionFragments(fragments, 3, 15, 0.99);
    generateExplosionFragments(fragments, 2, 23, 0.98); // x1.5
    generateExplosionFragments(fragments, 3, 17, 0.97);
    generateExplosionFragments(fragments, 4, 35, 0.96); // x2
    generateExplosionFragments(fragments, 5, 23, 0.95);
    generateExplosionFragments(fragments, 6, 70, 0.93); // x3
    generateExplosionFragments(fragments, 7, 24, 0.91);
    generateExplosionFragments(fragments, 8, 74, 0.85); // x3
    generateExplosionFragments(fragments, 9, 25, 0.8);
    generateExplosionFragments(fragments, 0, 77, 0.75); // x3
    generateExplosionFragments(fragments, 0, 27, 0.7);
    generateExplosionFragments(fragments, 1, 31, 0.6);
    generateExplosionFragments(fragments, 2, 34, 0.5);
    generateExplosionFragments(fragments, 3, 41, 0.4);
    generateExplosionFragments(fragments, 4, 43, 0.3);

    if(! Animation.isMove) requestAnimationFrame(Animation.move);
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