import { ctx } from './canvas.js';
import { fragments } from './fragments/fragment.js';

export default class Animation {
    static isMove = false;

    static move() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        fragments.forEach(fragment => {
            fragment.update();
            fragment.draw();
        });
    
        const anyFragmentsInProgress = fragments.some(fragment => fragment.progress < 1);
    
        if (anyFragmentsInProgress) {
            Animation.isMove = true;
            requestAnimationFrame(Animation.move);
        }else{
            Animation.isMove = false;
        }
    
        console.log('isAnimating... particles length: ' + fragments.length);
    }
}