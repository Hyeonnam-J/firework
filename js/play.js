import { create, soar } from './func/fireworkFunc.js';

function fire() {
    let origin = create();
    soar(origin);
}

for (let i = 0; i < 2; i++) {
    setTimeout(() => {
        fire();
    }, i * 300);
}

// for(let i = 0; i < 10; i++){
//     fire();
//     // console.log(
//     //     0.8 + Math.random() * 0.2
//     // );
// }
