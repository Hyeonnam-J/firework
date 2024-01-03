import Particle from '../fragments/Particle.js'; 
import Utils from '../Utils.js';
import Animation from '../Animation.js';
import Fragment from '../fragments/fragment.js';

function shoot(origin, explosion, fragmentsActType){
    generateShootingFragments(origin, explosion, -52.5, 52.5, 15, 1, fragmentsActType);
    generateShootingFragments(origin, explosion, -45, 45, 15, 0.85, fragmentsActType);
    generateShootingFragments(origin, explosion, -37.5, 37.5, 15, 0.7, fragmentsActType);
    generateShootingFragments(origin, explosion, -30, 30, 15, 0.55, fragmentsActType);
}

function generateShootingFragments(origin, explosion, startAngle, endAngle, angleGap, distancePercentage, fragmentsActType){
    for(let angle = startAngle; angle <= endAngle; angle += angleGap){
        const fragmentEndPoint = Utils.calculateCoordinates(
            origin.x,
            origin.y,
            explosion.distance * distancePercentage,
            angle - 90  // ctx.rotate() 시, 진행 방향과 머리 방향 일치를 위해.
        );

        const particle = new Particle(
            origin.x,
            origin.y,
            fragmentEndPoint.x,
            fragmentEndPoint.y,
            explosion.particlesWidth,
            explosion.particlesHeight,
            explosion.duration,
            origin.color,
            angle,
            () => {
                switch(fragmentsActType){
                    case Fragment.fragmentsActType.shoot:
                        break;

                    case Fragment.fragmentsActType.shootWithFallingParticles:
                        const particle = new Particle(
                            fragmentEndPoint.x,
                            fragmentEndPoint.y,
                            fragmentEndPoint.x,
                            fragmentEndPoint.y + Utils.values.heavyGravity,
                            Utils.values.fallingParticlesSize,
                            Utils.values.fallingParticlesSize,
                            Utils.values.fallingParticlesDuration(),
                            origin.color,
                            180
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