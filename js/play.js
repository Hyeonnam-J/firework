import { viewWidth, viewHeight } from './canvas.js';
import Fragment from './fragments/fragment.js';
import { fire } from './func/fireworkFunc.js';
import Utils from './Utils.js';

let count = 0;
for (let i = 0; i < 2; i++) {
    setTimeout(() => {
        if(count == 0) fire(viewWidth * 0.5, viewHeight * 0.5, 2000, Utils.colors.aqua, Fragment.fragmentsActType.explodeWithFallingParticles);
        else fire(viewWidth * 0.5, viewHeight * 0.5, 2000, Utils.colors.aqua, Fragment.fragmentsActType.shootWithFallingParticles);
        count++;
    }, i * 300);
}

// for(let i = 0; i < 10; i++){
//     fire();
//     // console.log(
//     //     0.8 + Math.random() * 0.2
//     // );
// }
