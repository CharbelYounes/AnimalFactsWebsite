// gallery.js: Handles gallery interactions and 3D card flip logic

// Main class for managing the animal gallery and card flip behavior
class AnimalGallery {
  constructor(containerId) {
    // Get the container where the gallery will be rendered
    this.container = document.getElementById(containerId);
    // List of animals to display in the gallery
    this.animals = [
      { name: 'Lion', image: 'assets/lion.jpg', fact: 'Lions can sleep for up to 20 hours a day!' },
      { name: 'Elephant', image: 'assets/Elephant.jpg', fact: 'Elephants are the only mammals that cannot jump.' },
      { name: 'Giraffe', image: 'assets/giraffe.jpg', fact: 'Giraffes have the same number of neck vertebrae as humans: 7!' },
      { name: 'Penguin', image: 'assets/penguinz.jpg', fact: 'Penguins can jump as high as 6 feet out of water.' },
      { name: 'Dolphin', image: 'assets/dolphin.jpg', fact: 'Dolphins can recognize themselves in mirrors.' },
      { name: 'Tiger', image: 'assets/tiger.jpg', fact: 'Tigers have striped skin, not just striped fur!' }
    ];
    this.init();
  }

  // Initialize the gallery and event listeners
  init() {
    this.renderGallery();
    this.addEventListeners();
  }

  // Render the animal cards in the gallery
  renderGallery() {
    this.container.innerHTML = this.animals.map(animal => `
      <div class="flip-card" data-animal="${animal.name.toLowerCase()}" tabindex="0">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src="${animal.image}" alt="${animal.name}" class="img-fluid rounded" style="max-width: 200px; max-height: 200px; object-fit: cover;">
            <h5 class="mt-3 text-center">${animal.name}</h5>
            <p class="text-muted text-center small">Click or hover to see fun fact!</p>
          </div>
          <div class="flip-card-back">
            <div class="text-center p-3">
              <h5 class="mb-3">${animal.name}</h5>
              <p class="mb-3">${animal.fact}</p>
              <button class="btn btn-sm btn-outline-primary flip-back-btn">Flip Back</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Add event listeners for flipping cards and accessibility
  addEventListeners() {
    // Flip card on click (front side)
    this.container.addEventListener('click', (e) => {
      // If the Flip Back button is clicked, flip the card back
      if (e.target.classList.contains('flip-back-btn')) {
        const flipCard = e.target.closest('.flip-card');
        flipCard.classList.remove('flipped');
        flipCard.classList.remove('manual-flip');
        return;
      }
      // If the front of the card is clicked, flip it to show the back
      const front = e.target.closest('.flip-card-front');
      if (front) {
        const flipCard = front.closest('.flip-card');
        flipCard.classList.add('flipped');
        flipCard.classList.add('manual-flip');
      }
    });

    // Prevent hover flipping for cards that are manually flipped
    this.container.addEventListener('mouseenter', (e) => {
      const card = e.target.closest('.flip-card');
      if (card && card.classList.contains('manual-flip')) {
        card.classList.remove('flipped');
      }
    }, true);

    // Add keyboard support for accessibility (Enter/Space to flip)
    this.container.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const flipCard = e.target.closest('.flip-card');
        if (flipCard) {
          e.preventDefault();
          flipCard.classList.toggle('flipped');
          flipCard.classList.toggle('manual-flip');
        }
      }
    });
  }
}

// Initialize the AnimalGallery class when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new AnimalGallery('gallery-container');
}); 