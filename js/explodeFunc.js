import { Particle, particles } from './particle.js';
import { calculateCoordinates, values } from './util.js';
import Animation from './Animation.js';
import { fragmentsType } from './fragments.js';

function explode(fragments, afterEffect) {
    generateExplosionFragments(fragments, 1, 15, 0.9, afterEffect);
    generateExplosionFragments(fragments, 2, 15, 0.9, afterEffect);
    generateExplosionFragments(fragments, 3, 15, 0.9, afterEffect);
    generateExplosionFragments(fragments, 2, 23, 0.9, afterEffect); // x1.5
    generateExplosionFragments(fragments, 3, 17, 0.9, afterEffect);
    generateExplosionFragments(fragments, 4, 35, 0.9, afterEffect); // x2
    generateExplosionFragments(fragments, 5, 23, 0.9, afterEffect);
    generateExplosionFragments(fragments, 6, 70, 0.9, afterEffect); // x3
    generateExplosionFragments(fragments, 7, 24, 0.9, afterEffect);
    generateExplosionFragments(fragments, 8, 74, 0.8, afterEffect); // x3
    generateExplosionFragments(fragments, 9, 25, 0.8, afterEffect);
    generateExplosionFragments(fragments, 0, 77, 0.7, afterEffect); // x3
    generateExplosionFragments(fragments, 0, 27, 0.7, afterEffect);
    generateExplosionFragments(fragments, 1, 31, 0.6, afterEffect);
    generateExplosionFragments(fragments, 2, 34, 0.5, afterEffect);
    generateExplosionFragments(fragments, 3, 41, 0.4, afterEffect);
    generateExplosionFragments(fragments, 4, 43, 0.3, afterEffect);
}

function generateExplosionFragments(fragments, startAngle, angleGap, distancePercentage, afterEffect){
    const fragmentsPoint_X = fragments.fragmentsPoint_X;
    const fragmentsPoint_Y = fragments.fragmentsPoint_Y;
    const fragmentsColor = fragments.fragmentsColor;
    const fragmentsWidth = values.fragmentsWidth;
    const fragmentsHeight = values.fragmentsHeight;
    const fragmentsDuration = values.fragmentsDuration();
    const fragmentsDistance = values.fragmentsDefaultDistance();

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
                switch(afterEffect){
                    case fragmentsType.explode:
                        break;
                    
                    case fragmentsType.explodeWithFallingFragments:
                        const particle = new Particle(
                            fragmentsEndPoint.x,
                            fragmentsEndPoint.y,
                            fragmentsEndPoint.x,
                            fragmentsEndPoint.y + 10,
                            values.afterImageSize,
                            values.afterImageSize,
                            values.afterImageDuration(),
                            fragmentsColor,
                            180,
                            () => {}
                        )
                        particles.push(particle);
                        if(! Animation.isMove) requestAnimationFrame(Animation.move);
                        break;

                    default:
                        break;
                }   // switch
            }   // parent new Particle's callback
        );  // parent new Particle
        
        particles.push(particle);
        if(! Animation.isMove) requestAnimationFrame(Animation.move);
    }   // for
}

export { explode };