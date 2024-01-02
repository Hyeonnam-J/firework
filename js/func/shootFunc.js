import { Particle } from '../fragments/particle.js'; 
import { calculateCoordinates, values } from '../util.js';
import Animation from '../Animation.js';
import { fragmentArr, fragmentsActType } from '../fragments/fragment.js'; 

function shoot(origin, afterEffect){
    generateShootingFragments(origin, -30, 30, 30, 1, afterEffect);
    generateShootingFragments(origin, -45, 45, 30, 0.7, afterEffect);
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
                    case fragmentsActType.shoot:
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

export { shoot }