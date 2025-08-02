// Animate cards on scroll
const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

cards.forEach(card => {
  observer.observe(card);
});

// Animate testimonial cards on scroll
const testimonialCards = document.querySelectorAll('.testimonial-card');

const testimonialObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      testimonialObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

testimonialCards.forEach(card => {
  testimonialObserver.observe(card);
});

// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const toggle = item.querySelector('.faq-toggle');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});

// Expandable Services Functionality
function toggleService(header) {
  const serviceItem = header.parentElement;
  const isActive = serviceItem.classList.contains('active');
  
  // Close all other service items
  const allServiceItems = document.querySelectorAll('.service-item');
  allServiceItems.forEach(item => {
    item.classList.remove('active');
  });
  
  // Toggle current service item
  if (!isActive) {
    serviceItem.classList.add('active');
  }
}

