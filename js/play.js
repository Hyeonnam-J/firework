import { viewWidth, viewHeight } from './canvas.js';
import Fragment from './fragments/Fragment.js';
import { fire } from './acts/fire.js';
import Utils from './Utils.js';

// const color = Utils.colors.white;
// const fragmentsActType = Fragment.fragmentsActType.burstWithTwinkle;
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
const fragmentsActType = Fragment.fragmentsActType.tripleErupt;
const soaring = {
    start_x: viewWidth * 0.5,
    end_x: viewWidth * 0.5,
    start_y: viewHeight,
    end_y: viewHeight * 0.7,
    duration: 2000,
};
const explosion = {
    distance: 500,
    duration: 5000,
};
fire(color, fragmentsActType, soaring, explosion);