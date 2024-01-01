import { create, soar, explode } from './fireworkFunc.js';

function fire() {
    let origin = create();
    soar(origin);
}

// 한 발 쏘기.
fire();
