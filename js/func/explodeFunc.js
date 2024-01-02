import { Particle } from '../fragments/particle.js'; 
import { calculateCoordinates, values } from '../util.js';
import Animation from '../Animation.js';
import { fragmentArr, fragmentActType } from '../fragments/fragment.js'; 

function explode(fragment, afterEffect) {
    generateExplosionFragments(fragment, 1, 15, 0.9, afterEffect);
    generateExplosionFragments(fragment, 2, 15, 0.9, afterEffect);
    generateExplosionFragments(fragment, 3, 15, 0.9, afterEffect);
    generateExplosionFragments(fragment, 2, 23, 0.9, afterEffect); // x1.5
    generateExplosionFragments(fragment, 3, 17, 0.9, afterEffect);
    generateExplosionFragments(fragment, 4, 35, 0.9, afterEffect); // x2
    generateExplosionFragments(fragment, 5, 23, 0.9, afterEffect);
    generateExplosionFragments(fragment, 6, 70, 0.9, afterEffect); // x3
    generateExplosionFragments(fragment, 7, 24, 0.9, afterEffect);
    generateExplosionFragments(fragment, 8, 74, 0.8, afterEffect); // x3
    generateExplosionFragments(fragment, 9, 25, 0.8, afterEffect);
    generateExplosionFragments(fragment, 0, 77, 0.7, afterEffect); // x3
    generateExplosionFragments(fragment, 0, 27, 0.7, afterEffect);
    generateExplosionFragments(fragment, 1, 31, 0.6, afterEffect);
    generateExplosionFragments(fragment, 2, 34, 0.5, afterEffect);
    generateExplosionFragments(fragment, 3, 41, 0.4, afterEffect);
    generateExplosionFragments(fragment, 4, 43, 0.3, afterEffect);
}

function generateExplosionFragments(fragment, startAngle, angleGap, distancePercentage, afterEffect){
    const fragmentPoint_X = fragment.fragmentPoint_X;
    const fragmentPoint_Y = fragment.fragmentPoint_Y;
    const fragmentColor = fragment.fragmentColor;
    const fragmentWidth = values.fragmentWidth;
    const fragmentHeight = values.fragmentHeight;
    const fragmentDuration = values.fragmentDuration();
    const fragmentDistance = values.fragmentDefaultDistance();

    for(let angle = startAngle; angle < 360; angle += angleGap){
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
                    case fragmentActType.explode:
                        break;
                    
                    case fragmentActType.explodeWithFallingFragments:
                        const particle = new Particle(
                            fragmentEndPoint.x,
                            fragmentEndPoint.y,
                            fragmentEndPoint.x,
                            fragmentEndPoint.y + 10,
                            values.afterImageSize,
                            values.afterImageSize,
                            values.afterImageDuration(),
                            fragmentColor,
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