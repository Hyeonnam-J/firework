import { canvas, ctx } from './canvas.js';
import Fragment from './fragments/fragment.js';

export default class Animation {
    static isMove = false;

    static move() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        Fragment.fragmentArr.forEach(fragment => {
            fragment.update();
            fragment.draw();
        });
    
        const anyFragmentsInProgress = Fragment.fragmentArr.some(fragment => fragment.progress < 1);
    
        if (anyFragmentsInProgress) {
            Animation.isMove = true;
            requestAnimationFrame(Animation.move);
        }else{
            Animation.isMove = false;
        }
    
        console.log('isAnimating... particles length: ' + Fragment.fragmentArr.length);
    }
}