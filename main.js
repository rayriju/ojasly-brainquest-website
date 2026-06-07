// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Hamburger
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('visible');
      observer.unobserve(el.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.world-card, .step-card, .parent-card, .bd-card, .gamif-list li').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Waitlist form
const form = document.getElementById('waitlist-form');
const success = document.getElementById('waitlist-success');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.style.display = 'none';
    success.style.display = 'block';
    // TODO: wire to your backend / Supabase
    // fetch('/api/waitlist', { method:'POST', body: JSON.stringify({name, email}) })
  });
}
