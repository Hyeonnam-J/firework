import { viewWidth, viewHeight } from './canvas.js';
import Fragment from './fragments/fragment.js';
import { fire } from './func/fire.js';
import Utils from './Utils.js';

// const color = Utils.colors.white;
// const fragmentsActType = Fragment.fragmentsActType.burst;
// const soaring = {
//     start_x: viewWidth * 0.5,
//     end_x: viewWidth * 0.5,
//     start_y: viewHeight,
//     end_y: viewHeight * 0.5,
//     duration: 2000,
// };
// const explosion = {
//     distance: 300,
//     duration: 5000,
// };

const color = Utils.colors.white;
const fragmentsActType = Fragment.fragmentsActType.erupt;
const soaring = {
    start_x: viewWidth * 0.5,
    end_x: viewWidth * 0.5,
    start_y: viewHeight,
    end_y: viewHeight * 0.7,
    duration: 2000,
};
const explosion = {
    distance: 1000,
    duration: 5000,
};
fire(color, fragmentsActType, soaring, explosion);

// let count = 0;
// for (let i = 0; i < 2; i++) {
//     setTimeout(() => {
//         if(count == 0){
//             const color = Utils.colors.aqua;
//             const fragmentsActType = Fragment.fragmentsActType.burstWithFallingParticles;
//             const soaring = {
//                 start_x: viewWidth * 0.5,
//                 end_x: viewWidth * 0.5,
//                 start_y: viewHeight,
//                 end_y: viewHeight * 0.5,

//                 width: Utils.values.soaringWidth,
//                 height: Utils.values.soaringHeight,

//                 duration: 2000,
//             };
//             const explosion = {
//                 particlesWidth: Utils.values.particlesWidth,
//                 particlesHeight: Utils.values.particlesHeight,
//                 distance: 400,
//                 duration: 5000,
//             };
//             fire(color, fragmentsActType, soaring, explosion);
//         }else{
//             const color = Utils.colors.aqua;
//             const fragmentsActType = Fragment.fragmentsActType.shootWithFallingParticles;
//             const soaring = {
//                 start_x: viewWidth * 0.5,
//                 end_x: viewWidth * 0.5,
//                 start_y: viewHeight,
//                 end_y: viewHeight * 0.5,

//                 width: Utils.values.soaringWidth,
//                 height: Utils.values.soaringHeight,

//                 duration: 2000,
//             };
//             const explosion = {
//                 particlesWidth: Utils.values.particlesWidth,
//                 particlesHeight: Utils.values.particlesHeight,
//                 distance: 400,
//                 duration: 5000,
//             };
//             fire(color, fragmentsActType, soaring, explosion);
//         }
//         count++;
//     }, i * 300);
// }

// for(let i = 0; i < 10; i++){
//     fire();
//     // console.log(
//     //     0.8 + Math.random() * 0.2
//     // );
// }
