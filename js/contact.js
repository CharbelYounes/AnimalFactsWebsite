// contact.js: Handles contact form validation and submission
class ContactForm {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    
    if (this.validateForm()) {
      this.showLoading();
      // Simulate form submission (in a real app, you'd send to a server)
      setTimeout(() => {
        this.showSuccess();
        this.resetForm();
      }, 1500);
    }
  }

  validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
      this.showError('Please fill in all fields.');
      return false;
    }

    if (!this.isValidEmail(email)) {
      this.showError('Please enter a valid email address.');
      return false;
    }

    return true;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showLoading() {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
  }

  showSuccess() {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Send Message';
    
    // Create success alert
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show mt-3';
    alert.innerHTML = `
      <strong>Success!</strong> Your message has been sent. We'll get back to you soon!
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    this.form.parentNode.insertBefore(alert, this.form.nextSibling);
    
    // Auto-remove alert after 5 seconds
    setTimeout(() => {
      if (alert.parentNode) {
        alert.remove();
      }
    }, 5000);
  }

  showError(message) {
    // Remove existing error alerts
    const existingAlerts = this.form.parentNode.querySelectorAll('.alert-danger');
    existingAlerts.forEach(alert => alert.remove());

    // Create error alert
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger alert-dismissible fade show mt-3';
    alert.innerHTML = `
      <strong>Error!</strong> ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    this.form.parentNode.insertBefore(alert, this.form.nextSibling);
    
    // Auto-remove alert after 5 seconds
    setTimeout(() => {
      if (alert.parentNode) {
        alert.remove();
      }
    }, 5000);
  }

  resetForm() {
    this.form.reset();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ContactForm('contact-form');
}); 