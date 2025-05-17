const halo = document.getElementById('halo');

let targetX = window.innerWidth/2, targetY = window.innerHeight/2;
let currentX = targetX, currentY = targetY;

window.addEventListener('pointermove', e => {
  targetX = e.clientX;
  targetY = e.clientY;
});

function animate() {
  /* factor 0.1 = 10 % de avance por frame → retardo ligero */
  const ease = 0.1;                      
  currentX += (targetX - currentX) * ease;
  currentY += (targetY - currentY) * ease;

  halo.style.setProperty('--x', `${currentX}px`);
  halo.style.setProperty('--y', `${currentY}px`);

  requestAnimationFrame(animate);
}
animate();