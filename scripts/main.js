import { addToCart, goToPage } from './script.js';
import { toggleInfo } from './script.js';

document.addEventListener('DOMContentLoaded', () => {
  const authPanel = document.getElementById('sidebar-auth');
  const authToggleBtn = document.getElementById('auth-toggle-btn');
  const closeBtn = document.querySelector('.close-btn'); 

  authToggleBtn.addEventListener('click', () => authPanel.classList.add('open'));
  closeBtn.addEventListener('click', () => authPanel.classList.remove('open'));

  document.addEventListener('click', (e) => {
    if (!authPanel.contains(e.target) && !authToggleBtn.contains(e.target)) {
      authPanel.classList.remove('open');
    }
  });

  document.getElementById('signup-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Signup successful! 🎉');
    authPanel.classList.remove('open');
  });

  document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Login successful! ☕');
    authPanel.classList.remove('open');
  });

  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.addEventListener('click', addToCart);
  });
  
  document.querySelectorAll(".toggle-info").forEach(button => {
    button.addEventListener('click', toggleInfo);
  })

 

 

  const modal = document.getElementById('registrationModal');
  const openBtns = document.querySelectorAll('.register-btn');
  const closeModalBtn = modal.querySelector('.modal-close-btn');

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
  });

  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    const target = this.hash;
    $('html, body').animate({ scrollTop: $(target).offset().top - 80 }, 700);
  });
});

document.getElementById('orderNowBtn').addEventListener('click', () => {
  document.querySelector('#coffee-menu').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('visitMenuBtn').addEventListener('click', () => {
  goToPage('../pages/menu.html');
});

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('coffeeSearch');
  if (!searchInput) return; 

  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    document.querySelectorAll('.coffee-card').forEach(card => {
      const name = card.dataset.name.toLowerCase();
      card.style.display = name.includes(query) ? 'block' : 'none';
    });
  });
});


