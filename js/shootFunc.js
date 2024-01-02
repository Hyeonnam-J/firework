import { Particle, particles } from './particle.js';
import { calculateCoordinates, values } from './util.js';
import Animation from './Animation.js';
import { fragmentsType } from './fragments.js';

function shoot(fragments, afterEffect){
    generateShootingFragments(fragments, -30, 30, 30, 1, afterEffect);
    generateShootingFragments(fragments, -45, 45, 30, 0.7, afterEffect);
}

function generateShootingFragments(fragments, startAngle, endAngle, angleGap, distancePercentage, afterEffect){
    const fragmentsPoint_X = fragments.fragmentsPoint_X;
    const fragmentsPoint_Y = fragments.fragmentsPoint_Y;
    const fragmentsColor = fragments.fragmentsColor;
    const fragmentsWidth = values.fragmentsWidth;
    const fragmentsHeight = values.fragmentsHeight;
    const fragmentsDuration = values.fragmentsDuration();
    const fragmentsDistance = values.fragmentsLongDistance();

    for(let angle = startAngle; angle <= endAngle; angle += angleGap){
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
                    case fragmentsType.shoot:
                        break;
                    
                    // case fragmentsType.explodeWithFallingDust:
                    //     const particle = new Particle(
                    //         fragmentsEndPoint.x,
                    //         fragmentsEndPoint.y,
                    //         fragmentsEndPoint.x,
                    //         fragmentsEndPoint.y + 10,
                    //         values.afterImageSize,
                    //         values.afterImageSize,
                    //         values.afterImageDuration(),
                    //         fragmentsColor,
                    //         180,
                    //         () => {}
                    //     )
                    //     particles.push(particle);
                    //     if(! Animation.isMove) requestAnimationFrame(Animation.move);
                    //     break;

                    default:
                        break;
                }   // switch
            }   // parent new Particle's callback
        );  // parent new Particle
        
        particles.push(particle);
        if(! Animation.isMove) requestAnimationFrame(Animation.move);
    }   // for
}

export { shoot }