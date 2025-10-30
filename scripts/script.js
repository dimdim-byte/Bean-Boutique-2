export const goToPage = (url) => {
  window.location.href = url;
}


export const toggleInfo = (e) => {
  const button = e.currentTarget;
  const card = button.closest('.coffee-card');
  card.classList.toggle('active');
  const icon = button.querySelector('i');
  icon.classList.toggle('bi-chevron-down');
  icon.classList.toggle('bi-chevron-up');

 
}

export const addToCart = (e) => {
  const card = e.target.closest('.coffee-card');
        const name = card.querySelector('h3').textContent;
        const image = card.querySelector('img').src;
        const price = parseInt(e.target.dataset.price); 

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existing = cart.find(item => item.name === name);

        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({ name, image, price, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${name} added to your cart! 🛒`);
}

