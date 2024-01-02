import { create, soar } from './fireworkFunc.js';

function fire() {
    let origin = create();
    soar(origin);
}

for(let i = 0; i < 2; i++){
    // 한 발 쏘기.
    fire();
    // console.log(
    //     0.8 + Math.random() * 0.2
    // );
}
