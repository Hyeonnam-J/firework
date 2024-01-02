import { Particle, particles } from './particle.js';
import { calculateCoordinates, values } from './util.js';
import Animation from './Animation.js';
import { fragmentsType } from './fragments.js';

function explode(fragments, afterImage) {
    generateExplosionFragments(fragments, 1, 15, 0.9, afterImage);
    generateExplosionFragments(fragments, 2, 15, 0.9, afterImage);
    generateExplosionFragments(fragments, 3, 15, 0.9, afterImage);
    generateExplosionFragments(fragments, 2, 23, 0.9, afterImage); // x1.5
    generateExplosionFragments(fragments, 3, 17, 0.9, afterImage);
    generateExplosionFragments(fragments, 4, 35, 0.9, afterImage); // x2
    generateExplosionFragments(fragments, 5, 23, 0.9, afterImage);
    generateExplosionFragments(fragments, 6, 70, 0.9, afterImage); // x3
    generateExplosionFragments(fragments, 7, 24, 0.9, afterImage);
    generateExplosionFragments(fragments, 8, 74, 0.8, afterImage); // x3
    generateExplosionFragments(fragments, 9, 25, 0.8, afterImage);
    generateExplosionFragments(fragments, 0, 77, 0.7, afterImage); // x3
    generateExplosionFragments(fragments, 0, 27, 0.7, afterImage);
    generateExplosionFragments(fragments, 1, 31, 0.6, afterImage);
    generateExplosionFragments(fragments, 2, 34, 0.5, afterImage);
    generateExplosionFragments(fragments, 3, 41, 0.4, afterImage);
    generateExplosionFragments(fragments, 4, 43, 0.3, afterImage);
}

function generateExplosionFragments(fragments, startAngle, angleGap, distancePercentage, afterImage){
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
                switch(afterImage){
                    case fragmentsType.explode:
                        break;
                    
                    case fragmentsType.explodeWithFallingDust:
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

                    default:
                        break;
                }   // switch
            }   // parent new Particle's callback
        );  // parent new Particle
        
        particles.push(particle);
        if(! Animation.isMove) requestAnimationFrame(Animation.move);
    }
}

export { explode };