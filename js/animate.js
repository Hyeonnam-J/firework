import { viewWidth, viewHeight, body, canvas, ctx } from './canvas.js';
import { Particle, particles } from './particle.js';

function move() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    const anyParticleInProgress = particles.some(particle => particle.progress < 1);

    if (anyParticleInProgress) {
        requestAnimationFrame(move);
    }

    console.log('isAnimating... particles length: ' + particles.length);
}

export { move };