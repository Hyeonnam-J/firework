import { create, soar, explode } from './fireworkFunc.js';

function fire() {
    let origin = create();
    soar(origin);
}

for(let i = 0; i < 10; i++){
    // 한 발 쏘기.
    // fire();
    console.log(
        Math.random() * 30
    );
}
