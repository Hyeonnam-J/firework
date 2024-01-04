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
    const particlesSize = 4;
    let plusDistanceValue = 0.01;

    const color = getColor();

    for(let i = 1; i >= 0; i -= plusDistanceValue){
        if(i < 0.4) plusDistanceValue = 0.02;

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
            color,
            angle
        );  // parent new Particle
        
        Fragment.fragmentArr.push(particle);
        if(! Animation.isMove) requestAnimationFrame(Animation.move);
    }   // for
}

// -10 ~ 10도 랜덤 생성.
function getCenterSideEruption(){
    return (Math.random() * 20) - 10;    
}

// -35 ~ -15도 랜덤 생성.
function getLeftSideEruption(){
    return (Math.random() * 20) - 35;    
}

// 15 ~ 35도 랜덤 생성.
function getRightSideEruption(){
    return (Math.random() * 20) + 15;    
}

// -25 ~ -5도 랜덤 생성.
function getHalfLeftSideEruption(){
    return (Math.random() * 20) - 25;    
}

// 5 ~ 25도 랜덤 생성.
function getHalfRightSideEruption(){
    return (Math.random() * 20) + 5;    
}

function getColor() {
    const colorArr = Object.keys(Utils.colors);
    return colorArr[Math.floor(Math.random() * colorArr.length)];
}

export { erupt }