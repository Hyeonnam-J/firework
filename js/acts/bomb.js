import Particle from '../fragments/Particle.js'; 
import Utils from '../Utils.js';
import Animation from '../Animation.js';
import Fragment from '../fragments/Fragment.js';

function bomb(origin, explosion, fragmentsActType){
    switch(fragmentsActType){
        case Fragment.fragmentsActType.bomb_olympic:
            generateBombFragments(Utils.calculateCoordinates(origin.x, origin.y, explosion.distance, 270), explosion, fragmentsActType);

            generateBombFragments(Utils.calculateCoordinates(origin.x, origin.y, explosion.distance * 1.15, 300), explosion, fragmentsActType);
            generateBombFragments(Utils.calculateCoordinates(origin.x, origin.y, explosion.distance * 1.15, 240), explosion, fragmentsActType);

            generateBombFragments(Utils.calculateCoordinates(origin.x, origin.y, explosion.distance * 0.7, 285), explosion, fragmentsActType);
            generateBombFragments(Utils.calculateCoordinates(origin.x, origin.y, explosion.distance * 0.7, 255), explosion, fragmentsActType);
            break;
    }
}

function generateBombFragments(bombOrigin, explosion, fragmentsActType){
    const color = Utils.getColor();
    const particlesSize = 4;
    const radius = 70;

    for(let angle = 0; angle < 360; angle += particlesSize){
        const radians = angle / 57.3;
        const x = bombOrigin.x + radius * Math.cos(radians);
        const y = bombOrigin.y + radius * Math.sin(radians);

        const particle = new Particle(
            Particle.state.explode,
            fragmentsActType,
            x,
            y,
            x,
            y,
            particlesSize,
            particlesSize,
            explosion.duration,
            color,
        )

        Fragment.fragmentArr.push(particle);
        if(! Animation.isMove) requestAnimationFrame(Animation.move);
    }
}

export { bomb };