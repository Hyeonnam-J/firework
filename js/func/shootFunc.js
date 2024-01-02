import Particle from '../fragments/particle.js'; 
import { calculateCoordinates, values } from '../util.js';
import Animation from '../Animation.js';
import Fragment from '../fragments/fragment.js';

function shoot(origin, afterEffect){
    generateShootingFragments(origin, -52.5, 52.5, 15, 1, afterEffect);
    generateShootingFragments(origin, -45, 45, 15, 0.85, afterEffect);
    generateShootingFragments(origin, -37.5, 37.5, 15, 0.7, afterEffect);
    generateShootingFragments(origin, -30, 30, 15, 0.55, afterEffect);
}

function generateShootingFragments(origin, startAngle, endAngle, angleGap, distancePercentage, afterEffect){
    const originPoint_X = origin.originPoint_X;
    const originPoint_Y = origin.originPoint_Y;
    const fragmentsColor = origin.fragmentsColor;
    const fragmentsWidth = values.fragmentsWidth;
    const fragmentsHeight = values.fragmentsHeight;
    const fragmentsDuration = values.fragmentsDuration();
    const fragmentsDistance = values.fragmentsLongDistance();

    for(let angle = startAngle; angle <= endAngle; angle += angleGap){
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
                    case Fragment.fragmentsActType.shoot:
                        break;

                    case Fragment.fragmentsActType.shootWithFallingParticles:
                        const particle = new Particle(
                            fragmentEndPoint.x,
                            fragmentEndPoint.y,
                            fragmentEndPoint.x,
                            fragmentEndPoint.y + values.heavyGravity,
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

export { shoot }