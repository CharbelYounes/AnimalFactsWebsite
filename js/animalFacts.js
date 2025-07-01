// animalFacts.js: Handles fetching and displaying animal facts from the API Ninjas Animals API

// Main class for managing animal facts UI and API integration
class AnimalFacts {
  constructor(containerId) {
    // The container where facts/results will be displayed
    this.container = document.getElementById(containerId);
    // API endpoint and key
    this.apiUrl = 'https://api.api-ninjas.com/v1/animals';
    this.apiKey = 'T0oX26c1Djxdu0PRMOC9rQ==jNd6hPwsI0Ro7V16';
    // Form and input for user animal name
    this.form = document.getElementById('animal-fact-form');
    this.input = document.getElementById('animal-name-input');
    // Button for random animal fact
    this.randomBtn = document.getElementById('random-fact-btn');
    // List of animals for random selection
    this.randomAnimals = [
      'lion', 'tiger', 'elephant', 'giraffe', 'cheetah', 'zebra', 'panda', 'kangaroo', 'koala', 'penguin', 'dolphin', 'bear', 'wolf', 'fox', 'rabbit', 'monkey', 'leopard', 'hippopotamus', 'rhinoceros', 'camel'
    ];
    this.init();
  }

  // Initialize event listeners and default message
  init() {
    // Handle form submission for user animal input
    if (this.form && this.input) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const animalName = this.input.value.trim();
        if (animalName) {
          this.fetchFactForAnimal(animalName);
        }
      });
    }
    // Handle random animal fact button
    if (this.randomBtn) {
      this.randomBtn.addEventListener('click', () => {
        const randomAnimal = this.randomAnimals[Math.floor(Math.random() * this.randomAnimals.length)];
        this.input.value = '';
        this.fetchFactForAnimal(randomAnimal);
      });
    }
    // Show a welcome/instruction message by default
    this.container.innerHTML = '<div class="alert alert-info">Enter an animal name above to get a fun fact!</div>';
  }

  // Fetch a fun fact for a given animal name from the API
  async fetchFactForAnimal(name) {
    this.renderLoading();
    try {
      const response = await fetch(`${this.apiUrl}?name=${encodeURIComponent(name)}`, {
        headers: { 'X-Api-Key': this.apiKey }
      });
      if (!response.ok) {
        throw new Error('No fun fact found for that animal.');
      }
      const result = await response.json();
      if (result && result.length > 0) {
        this.renderFact(result[0]);
      } else {
        this.renderEmpty(name);
      }
    } catch (error) {
      this.renderError(error);
    }
  }

  // Show a loading spinner/message
  renderLoading() {
    this.container.innerHTML = '<div class="text-center py-4"><div class="spinner-border text-primary" role="status"></div><p>Loading fun fact...</p></div>';
  }

  // Render a fact card for the given animal object
  renderFact(animal) {
    // Try to show a fun fact from the API response
    let fact = '';
    if (animal.characteristics && animal.characteristics.slogan) {
      fact = animal.characteristics.slogan;
    } else if (animal.characteristics && animal.characteristics.diet) {
      fact = `Diet: ${animal.characteristics.diet}`;
    } else {
      fact = 'No fun fact available, but here is some info: ' + JSON.stringify(animal.characteristics);
    }
    this.container.innerHTML = `
      <div class="card mb-3 shadow-sm">
        <div class="card-body">
          <h5 class="card-title text-capitalize">${animal.name}</h5>
          <p class="card-text">${fact}</p>
        </div>
      </div>
    `;
  }

  // Show a message if no fact is found for the animal
  renderEmpty(name) {
    this.container.innerHTML = `<div class="alert alert-warning">No fun fact found for "${name}". Try another animal!</div>`;
  }

  // Show an error message if the API call fails
  renderError(error) {
    this.container.innerHTML = `<div class="alert alert-danger">${error.message || 'An error occurred while fetching the fun fact.'}</div>`;
  }
}

// Initialize the AnimalFacts class when the DOM is ready

document.addEventListener('DOMContentLoaded', () => {
  new AnimalFacts('facts-container');
}); 