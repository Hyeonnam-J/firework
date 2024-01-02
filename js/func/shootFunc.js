import { Particle } from '../fragments/particle.js'; 
import { calculateCoordinates, values } from '../util.js';
import Animation from '../Animation.js';
import { fragments, fragmentActType } from '../fragments/fragment.js'; 

function shoot(fragment, afterEffect){
    generateShootingFragments(fragment, -30, 30, 30, 1, afterEffect);
    generateShootingFragments(fragment, -45, 45, 30, 0.7, afterEffect);
}

function generateShootingFragments(fragment, startAngle, endAngle, angleGap, distancePercentage, afterEffect){
    const fragmentPoint_X = fragment.fragmentPoint_X;
    const fragmentPoint_Y = fragment.fragmentPoint_Y;
    const fragmentColor = fragment.fragmentColor;
    const fragmentWidth = values.fragmentWidth;
    const fragmentHeight = values.fragmentHeight;
    const fragmentDuration = values.fragmentDuration();
    const fragmentDistance = values.fragmentLongDistance();

    for(let angle = startAngle; angle <= endAngle; angle += angleGap){
        const fragmentEndPoint = calculateCoordinates(
            fragmentPoint_X,
            fragmentPoint_Y,
            fragmentDistance * distancePercentage,
            angle - 90  // ctx.rotate() 시, 진행 방향과 머리 방향 일치를 위해.
        );

        const particle = new Particle(
            fragmentPoint_X,
            fragmentPoint_Y,
            fragmentEndPoint.x,
            fragmentEndPoint.y,
            fragmentWidth,
            fragmentHeight,
            fragmentDuration,
            fragmentColor,
            angle,
            () => {
                switch(afterEffect){
                    case fragmentActType.shoot:
                        break;
                    
                    // case fragmentActType.explodeWithFallingDust:
                    //     const particle = new Particle(
                    //         fragmentEndPoint.x,
                    //         fragmentEndPoint.y,
                    //         fragmentEndPoint.x,
                    //         fragmentEndPoint.y + 10,
                    //         values.afterImageSize,
                    //         values.afterImageSize,
                    //         values.afterImageDuration(),
                    //         fragmentsColor,
                    //         180,
                    //         () => {}
                    //     )
                    //     fragments.push(particle);
                    //     if(! Animation.isMove) requestAnimationFrame(Animation.move);
                    //     break;

                    default:
                        break;
                }   // switch
            }   // parent new Particle's callback
        );  // parent new Particle
        
        fragments.push(particle);
        if(! Animation.isMove) requestAnimationFrame(Animation.move);
    }   // for
}

export { shoot }