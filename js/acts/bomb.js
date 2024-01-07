import Particle from '../fragments/Particle.js'; 
import Utils from '../Utils.js';
import Animation from '../Animation.js';
import Fragment from '../fragments/Fragment.js';

function bomb(origin, explosion, fragmentsActType){
    switch(fragmentsActType){
        case Fragment.fragmentsActType.bomb_olympic:
            generateBombFragments(origin, Utils.calculateCoordinates(origin.x, origin.y, explosion.distance, 270), explosion, fragmentsActType);

            generateBombFragments(origin, Utils.calculateCoordinates(origin.x, origin.y, explosion.distance * 1.15, 300), explosion, fragmentsActType);
            generateBombFragments(origin, Utils.calculateCoordinates(origin.x, origin.y, explosion.distance * 1.15, 240), explosion, fragmentsActType);

            generateBombFragments(origin, Utils.calculateCoordinates(origin.x, origin.y, explosion.distance * 0.7, 285), explosion, fragmentsActType);
            generateBombFragments(origin, Utils.calculateCoordinates(origin.x, origin.y, explosion.distance * 0.7, 255), explosion, fragmentsActType);
            break;
    }
}

function generateBombFragments(origin, bombOrigin, explosion, fragmentsActType){
    const particlesSize = 4;
    const radius = 70;

    for(let i = bombOrigin.x - radius; i < bombOrigin.x + radius; i += particlesSize){
        for(let j = bombOrigin.y - radius; j < bombOrigin.y + radius; j += particlesSize){
            if(Math.random() < 1/30){
                var addX = (Math.random() * 40) - 20;
                var addY = (Math.random() * 40) - 20;

                const particle = new Particle(
                    Particle.state.explode,
                    fragmentsActType,
                    origin.x,
                    origin.y,
                    i + addX,
                    j + addY,
                    particlesSize,
                    particlesSize,
                    explosion.duration,
                    origin.color,
                )

                Fragment.fragmentArr.push(particle);
                if(! Animation.isMove) requestAnimationFrame(Animation.move);
            }
        }
    }
}

export { bomb };