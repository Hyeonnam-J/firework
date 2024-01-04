import Particle from '../fragments/Particle.js'; 
import Utils from '../Utils.js';
import Animation from '../Animation.js';
import Fragment from '../fragments/Fragment.js';

function erupt(origin, explosion, fragmentsActType){
    const particlesSize = 4;
    let plusDistanceValue = 0.01;

    for(let i = 1; i >= 0; i -= plusDistanceValue){
        if(i < 0.4) plusDistanceValue = 0.02;
        const angle = (Math.random() * 20) - 10;    // -10 ~ 10도 랜덤 생성.
        
        const fragmentEndPoint = Utils.calculateCoordinates(
            origin.x,
            origin.y,
            explosion.distance * i,
            angle - 90  // ctx.rotate() 시, 진행 방향과 머리 방향 일치를 위해.
        );

        const particle = new Particle(
            Particle.state.explode,
            fragmentsActType,
            origin.x,
            origin.y,
            fragmentEndPoint.x,
            fragmentEndPoint.y,
            particlesSize,
            particlesSize,
            explosion.duration,
            origin.color,
            angle
        );  // parent new Particle
        
        Fragment.fragmentArr.push(particle);
        if(! Animation.isMove) requestAnimationFrame(Animation.move);
    }   // for
}

export { erupt }