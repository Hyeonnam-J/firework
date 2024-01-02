import { Particle } from '../fragments/particle.js'; 
import { calculateCoordinates, values } from '../util.js';
import Animation from '../Animation.js';
import { fragmentArr, fragmentsActType } from '../fragments/fragment.js'; 

function explode(origin, afterEffect) {
    generateExplosionFragments(origin, 1, 15, 0.9, afterEffect);
    generateExplosionFragments(origin, 2, 15, 0.9, afterEffect);
    generateExplosionFragments(origin, 3, 15, 0.9, afterEffect);
    generateExplosionFragments(origin, 2, 23, 0.9, afterEffect); // x1.5
    generateExplosionFragments(origin, 3, 17, 0.9, afterEffect);
    generateExplosionFragments(origin, 4, 35, 0.9, afterEffect); // x2
    generateExplosionFragments(origin, 5, 23, 0.9, afterEffect);
    generateExplosionFragments(origin, 6, 70, 0.9, afterEffect); // x3
    generateExplosionFragments(origin, 7, 24, 0.9, afterEffect);
    generateExplosionFragments(origin, 8, 74, 0.8, afterEffect); // x3
    generateExplosionFragments(origin, 9, 25, 0.8, afterEffect);
    generateExplosionFragments(origin, 0, 77, 0.7, afterEffect); // x3
    generateExplosionFragments(origin, 0, 27, 0.7, afterEffect);
    generateExplosionFragments(origin, 1, 31, 0.6, afterEffect);
    generateExplosionFragments(origin, 2, 34, 0.5, afterEffect);
    generateExplosionFragments(origin, 3, 41, 0.4, afterEffect);
    generateExplosionFragments(origin, 4, 43, 0.3, afterEffect);
}

function generateExplosionFragments(origin, startAngle, angleGap, distancePercentage, afterEffect){
    const originPoint_X = origin.originPoint_X;
    const originPoint_Y = origin.originPoint_Y;
    const fragmentsColor = origin.fragmentsColor;
    const fragmentsWidth = values.fragmentsWidth;
    const fragmentsHeight = values.fragmentsHeight;
    const fragmentsDuration = values.fragmentsDuration();
    const fragmentsDistance = values.fragmentsDefaultDistance();

    for(let angle = startAngle; angle < 360; angle += angleGap){
        const fragmentEndPoint = calculateCoordinates(
            originPoint_X,
            originPoint_Y,
            fragmentsDistance * distancePercentage,
            angle - 90  // ctx.rotate() 시, 진행 방향과 머리 방향 일치를 위해.
        );

        const particle = new Particle(
            originPoint_X,
            originPoint_Y,
            fragmentEndPoint.x,
            fragmentEndPoint.y,
            fragmentsWidth,
            fragmentsHeight,
            fragmentsDuration,
            fragmentsColor,
            angle,
            () => {
                switch(afterEffect){
                    case fragmentsActType.explode:
                        break;
                    
                    case fragmentsActType.explodeWithFallingParticles:
                        const particle = new Particle(
                            fragmentEndPoint.x,
                            fragmentEndPoint.y,
                            fragmentEndPoint.x,
                            fragmentEndPoint.y + 10,
                            values.fallingParticlesSize,
                            values.fallingParticlesSize,
                            values.fallingParticlesDuration(),
                            fragmentsColor,
                            180,
                            () => {}
                        )
                        fragmentArr.push(particle);
                        if(! Animation.isMove) requestAnimationFrame(Animation.move);
                        break;

                    default:
                        break;
                }   // switch
            }   // parent new Particle's callback
        );  // parent new Particle
        
        fragmentArr.push(particle);
        if(! Animation.isMove) requestAnimationFrame(Animation.move);
    }   // for
}

export { explode };