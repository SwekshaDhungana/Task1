const cards = document.querySelectorAll('.card');
let activeIndex = 1; 

// Function to update card styles based on activeIndex
function updateCards() {
  cards.forEach((card, index) => {
    card.classList.remove('active', 'inactive', 'upper', 'lower');
    
    if (index === activeIndex) {
      card.classList.add('active');
    } else if (index === activeIndex - 1) {
      card.classList.add('upper');
    } else if (index === activeIndex + 1) {
      card.classList.add('lower');
    } else {
      card.classList.add('inactive');
    }
  });
}

// Initialize cards on page load
window.addEventListener('DOMContentLoaded', () => {
  updateCards();
});

// Drag functionality for active card
cards.forEach((card, index) => {
  let isDragging = false;
  let startY = 0;

  card.addEventListener('mousedown', (e) => {
    if (index !== activeIndex) return; 
    isDragging = true;
    startY = e.clientY;
    card.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    let currentY = e.clientY - startY;
    card.style.transform =`translateY(${currentY}px) scale(1.3)` ; 
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    card.style.cursor = 'grab';

    
    if (Math.abs(parseInt(card.style.transform.split('(')[1])) > 50) {
      if (parseInt(card.style.transform.split('(')[1]) < 0) {
    
        activeIndex = (activeIndex + 1) % cards.length;
      } else {
        activeIndex = (activeIndex - 1 + cards.length) % cards.length;
      }
    }

    card.style.transform = '';
    updateCards();
  });
});