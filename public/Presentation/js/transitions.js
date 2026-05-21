import { playSound } from './sound.js';

export async function transitionTo(oldSlide, newSlide, direction = 1) {
  // direction: 1 for next, -1 for prev
  
  if (oldSlide) {
    oldSlide.classList.remove('active');
  }

  // Show curtain and sprite
  const curtain = document.getElementById('transition-curtain');
  const sprite = document.getElementById('transition-sprite');
  
  if (curtain && sprite) {
    curtain.style.display = 'block';
    playSound('squick');

    // Simple animation for the sprite walking across the screen
    // We use a CSS animation or requestAnimationFrame
    await new Promise(resolve => {
      let start = performance.now();
      const duration = 600; // ms
      
      // Determine walking frame row (right = row 3, left = row 2) in character_base
      // Assuming 48x48 frames. 
      // row 0: down, row 1: up, row 2: left, row 3: right
      const bgPosY = direction === 1 ? -144 : -96;
      const startX = direction === 1 ? -64 : 800;
      const endX = direction === 1 ? 800 : -64;
      
      function animate(time) {
        let t = (time - start) / duration;
        if (t > 1) t = 1;
        
        // Update position
        sprite.style.left = `${startX + (endX - startX) * t}px`;
        
        // Update frame (4 frames per animation, 8fps approx)
        const frame = Math.floor(t * duration / 125) % 4;
        sprite.style.backgroundPosition = `${-frame * 48}px ${bgPosY}px`;
        
        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      }
      requestAnimationFrame(animate);
    });
    
    curtain.style.display = 'none';
  }

  if (newSlide) {
    newSlide.classList.add('active');
    playSound('bip');
  }
}
