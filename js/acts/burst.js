import Particle from '../fragments/Particle.js'; 
import Utils from '../Utils.js';
import Animation from '../Animation.js';
import Fragment from '../fragments/Fragment.js';

function burst(origin, explosion, fragmentsActType) {
    generateBurstFragments(origin, explosion, 0, 16, 0.99, fragmentsActType);
    generateBurstFragments(origin, explosion, 0, 17, 0.99, fragmentsActType);
    generateBurstFragments(origin, explosion, 0, 14, 0.98, fragmentsActType);
    generateBurstFragments(origin, explosion, 60, 63, 0.95, fragmentsActType);
    generateBurstFragments(origin, explosion, 108, 166, 0.93, fragmentsActType);
    generateBurstFragments(origin, explosion, 61, 68, 0.9, fragmentsActType);
    generateBurstFragments(origin, explosion, 140, 170, 0.87, fragmentsActType);
    generateBurstFragments(origin, explosion, 59, 72, 0.85, fragmentsActType);
    generateBurstFragments(origin, explosion, 10, 81, 0.8, fragmentsActType);
    generateBurstFragments(origin, explosion, 70, 84, 0.77, fragmentsActType);
    generateBurstFragments(origin, explosion, 50, 88, 0.75, fragmentsActType);
    generateBurstFragments(origin, explosion, 0, 91, 0.72, fragmentsActType);
    generateBurstFragments(origin, explosion, 104, 51, 0.7, fragmentsActType);
    generateBurstFragments(origin, explosion, 155, 159, 0.65, fragmentsActType);
    generateBurstFragments(origin, explosion, 2, 63, 0.6, fragmentsActType);
    generateBurstFragments(origin, explosion, 92, 68, 0.55, fragmentsActType);
    generateBurstFragments(origin, explosion, 106, 68, 0.5, fragmentsActType);
    generateBurstFragments(origin, explosion, 202, 63, 0.45, fragmentsActType);
    generateBurstFragments(origin, explosion, 42, 73, 0.4, fragmentsActType);
    generateBurstFragments(origin, explosion, 150, 89, 0.35, fragmentsActType);
    generateBurstFragments(origin, explosion, 50, 99, 0.3, fragmentsActType);
    generateBurstFragments(origin, explosion, 190, 158, 0.25, fragmentsActType);
    generateBurstFragments(origin, explosion, 100, 158, 0.2, fragmentsActType);
    generateBurstFragments(origin, explosion, 200, 189, 0.1, fragmentsActType);
}

function generateBurstFragments(origin, explosion, startAngle, angleGap, distancePercentage, fragmentsActType){
    const particlesWidth = 4;
    const particlesHeight = 20;
    
    for(let angle = startAngle; angle < 360; angle += angleGap){
        const fragmentEndPoint = Utils.calculateCoordinates(
            origin.x,
            origin.y,
            explosion.distance * distancePercentage,
            angle - 90  // ctx.rotate() 시, 진행 방향과 머리 방향 일치를 위해.
        );

        const particle = new Particle(
            Particle.state.explode,
            fragmentsActType,
            origin.x,
            origin.y,
            fragmentEndPoint.x,
            fragmentEndPoint.y,
            particlesWidth,
            particlesHeight,
            explosion.duration,
            origin.color,
            angle,
            () => {
                switch(fragmentsActType){
                    case Fragment.fragmentsActType.burst:
                        break;
                    
                    case Fragment.fragmentsActType.burstWithTwinkle:
                        const twinkleParticlesSize = 4;
                        const particle = new Particle(
                            Particle.state.flutter,
                            fragmentsActType,
                            fragmentEndPoint.x,
                            fragmentEndPoint.y,
                            fragmentEndPoint.x,
                            fragmentEndPoint.y,
                            twinkleParticlesSize,
                            twinkleParticlesSize,
                            getTwinkleParticlesDuration(),
                            origin.color,
                            0
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
    
function getTwinkleParticlesDuration(){
    return Math.random() * 2000;
}

export { burst };