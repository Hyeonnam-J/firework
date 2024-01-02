import Particle from '../fragments/particle.js'; 
import { calculateCoordinates, values } from '../util.js';
import Animation from '../Animation.js';
import Fragment from '../fragments/fragment.js';

function explode(origin, afterEffect) {
    generateExplosionFragments(origin, 0, 16, 0.99, afterEffect);
    generateExplosionFragments(origin, 0, 17, 0.99, afterEffect);
    generateExplosionFragments(origin, 0, 14, 0.98, afterEffect);

    generateExplosionFragments(origin, 60, 63, 0.95, afterEffect);
    generateExplosionFragments(origin, 108, 166, 0.93, afterEffect);
    generateExplosionFragments(origin, 61, 68, 0.9, afterEffect);
    generateExplosionFragments(origin, 140, 170, 0.87, afterEffect);
    generateExplosionFragments(origin, 59, 72, 0.85, afterEffect);

    generateExplosionFragments(origin, 10, 81, 0.8, afterEffect);
    generateExplosionFragments(origin, 70, 84, 0.77, afterEffect);
    generateExplosionFragments(origin, 50, 88, 0.75, afterEffect);
    generateExplosionFragments(origin, 0, 91, 0.72, afterEffect);
    generateExplosionFragments(origin, 104, 51, 0.7, afterEffect);
    generateExplosionFragments(origin, 155, 159, 0.65, afterEffect);

    generateExplosionFragments(origin, 2, 63, 0.6, afterEffect);
    generateExplosionFragments(origin, 92, 68, 0.55, afterEffect);
    generateExplosionFragments(origin, 106, 68, 0.5, afterEffect);
    generateExplosionFragments(origin, 202, 63, 0.45, afterEffect);
    generateExplosionFragments(origin, 42, 73, 0.4, afterEffect);
    generateExplosionFragments(origin, 150, 89, 0.35, afterEffect);
    generateExplosionFragments(origin, 50, 99, 0.3, afterEffect);
    generateExplosionFragments(origin, 190, 158, 0.25, afterEffect);
    generateExplosionFragments(origin, 100, 158, 0.2, afterEffect);
    generateExplosionFragments(origin, 200, 189, 0.1, afterEffect);
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
                    case Fragment.fragmentsActType.explode:
                        break;
                    
                    case Fragment.fragmentsActType.explodeWithFallingParticles:
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
                        Fragment.fragmentArr.push(particle);
                        if(! Animation.isMove) requestAnimationFrame(Animation.move);
                        break;

                    default:
                        break;
                }   // switch
            }   // parent new Particle's callback
        );  // parent new Particle
        
        Fragment.fragmentArr.push(particle);
        if(! Animation.isMove) requestAnimationFrame(Animation.move);
    }   // for
}

export { explode };