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
        showPopUp(`${name} added to cart!`);
}

const showPopUp = (message) => {

  const div = document.createElement('div');
  div.classList.add('popup-message');
  const img = document.createElement('img');
  img.src = "../assets/images/check.png";
  img.alt = "check_png";
  const h2 = document.createElement('h2');
  h2.textContent = "Success!";
  const p = document.createElement('p');
  p.textContent = message;
  const btn = document.createElement('button');
  btn.id = "closePopup";
  btn.textContent = "Close";

  div.appendChild(img);
  div.appendChild(h2);
  div.appendChild(p);
  div.appendChild(btn);

  btn.addEventListener('click', () => {
    const popup = document.querySelector('.popup-message');
    popup.style.opacity = '0';
    popup.addEventListener('transitionend', ()=> {
      document.body.removeChild(popup);
    }) // wait for fade out
  });

  document.body.appendChild(div);

  requestAnimationFrame(() => {
    document.querySelector('.popup-message').classList.add('show');
  });
}
