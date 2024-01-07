import Particle from '../fragments/Particle.js'; 
import Utils from '../Utils.js';
import Animation from '../Animation.js';
import Fragment from '../fragments/Fragment.js';

function erupt(origin, explosion, fragmentsActType){
    switch(fragmentsActType){
        case Fragment.fragmentsActType.singleErupt:
            generateEruptionFragments(origin, explosion, fragmentsActType, 'center');
            break;

        case Fragment.fragmentsActType.doubleErupt:
            generateEruptionFragments(origin, explosion, fragmentsActType, 'halfLeft');
            generateEruptionFragments(origin, explosion, fragmentsActType, 'halfRight');
            break;

        case Fragment.fragmentsActType.tripleErupt:
            generateEruptionFragments(origin, explosion, fragmentsActType, 'center');
            generateEruptionFragments(origin, explosion, fragmentsActType, 'left');
            generateEruptionFragments(origin, explosion, fragmentsActType, 'right');
            break;

        default:
            break;
    }
}

function generateEruptionFragments(origin, explosion, fragmentsActType, direction){
    const particlesSize = 2;
    let plusDistanceValue = 0.005;

    const color = Utils.getColor();

    for(let i = 1; i > 0; i -= plusDistanceValue){
        if(i < 0.4) plusDistanceValue = 0.01;
        if(i < 0.2) plusDistanceValue = 0.02;

        let angle = 0;
        switch(direction){
            case 'center':
                angle = getCenterSideEruption();
                break;

            case 'left':
                angle = getLeftSideEruption();
                break;

            case 'halfLeft':
                angle = getHalfLeftSideEruption();
                break;

            case 'right':
                angle = getRightSideEruption();
                break;

            case 'halfRight':
                angle = getHalfRightSideEruption();
                break;

            default:
                break;
        }
        
        const fragmentEndPoint = Utils.calculateCoordinates(
            origin.x,
            origin.y,
            explosion.distance * i,
            angle
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
            color,
            angle
        );  // parent new Particle
        
        Fragment.fragmentArr.push(particle);
        if(! Animation.isMove) requestAnimationFrame(Animation.move);
    }   // for
}

// -100 ~ -80도 랜덤 생성.
function getCenterSideEruption(){
    return (Math.random() * 20) - 100;    
}

// -125 ~ -105도 랜덤 생성.
function getLeftSideEruption(){
    return (Math.random() * 20) - 125;    
}

// -75 ~ -55도 랜덤 생성.
function getRightSideEruption(){
    return (Math.random() * 20) - 75;    
}

// -115 ~ -95도 랜덤 생성.
function getHalfLeftSideEruption(){
    return (Math.random() * 20) - 115;    
}

// -85 ~ -65 랜덤 생성.
function getHalfRightSideEruption(){
    return (Math.random() * 20) - 85;    
}

export { erupt }