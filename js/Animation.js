import { ctx } from './canvas.js';
import { particles } from './fragments/particle.js';

export default class Animation {
    static isMove = false;

    static move() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
    
        const anyParticleInProgress = particles.some(particle => particle.progress < 1);
    
        if (anyParticleInProgress) {
            Animation.isMove = true;
            requestAnimationFrame(Animation.move);
        }else{
            Animation.isMove = false;
        }
    
        console.log('isAnimating... particles length: ' + particles.length);
    }
}