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
  
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('popup-overlay');

  const div = document.createElement('div');
  div.classList.add('popup-message');
  mainDiv.appendChild(div);

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
      document.body.removeChild(mainDiv);
    }) // wait for fade out
  });

  document.body.appendChild(mainDiv);

  requestAnimationFrame(() => {
    document.querySelector('.popup-message').classList.add('show');
  });
}

export const fetchData = async (url) => {
    try {
        const res = await fetch(url);
        if (!res.ok){
            throw new Error("Failed to load resources");
        }
        const data = await res.json();
        console.log(data)
        return data;
    } catch (e){
        console.log(e)
    }
};



const ratings = {
  1: `<i class="bi bi-star-fill"><i class="bi bi-star"><i class="bi bi-star"><i class="bi bi-star"><i class="bi bi-star">`,
  1.5: `<i class="bi bi-star-fill"><i class="bi bi-star-half"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>`,
  2: `<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>`,
  2.5: `<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>`,
  3: `<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>`,
  3.5: `<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i><i class="bi bi-star"></i>`,
  4: `<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i>`,
  4.5: `<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i>`,
  5: `<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>`
}

export const cloneCardTemplate = (clone, element) => {
    clone.querySelector('.coffee-img').src = element.image;
    clone.querySelector('.coffee-img').alt = element.name;
    clone.querySelector('h3').textContent = element.name;
    clone.querySelector('.coffee-price').textContent = `$${element.price.toFixed(2)}`;
    clone.querySelector('.coffee-card').setAttribute('data-name', element.name);
    if (element.beanImg){
      clone.querySelector('.bean-img').src = element.beanImg;
      clone.querySelector('.bean-img').alt = `${element.name} Bean`;
    } else {
      clone.querySelector('.bean-img').style.display = "none";
    }
    
    clone.querySelector('.coffee-info p').textContent = element.description;
    clone.querySelector('.rating').innerHtml = ratings[element.rating];
    clone.querySelector('.add-to-cart-btn').textContent = "Add to Cart";
    clone.querySelector('.add-to-cart-btn').dataset.price = element.price;
    clone.querySelector('.add-to-cart-btn').addEventListener('click', addToCart);
    clone.querySelector('.toggle-info').addEventListener('click', toggleInfo);

    return clone;
}

export const sortMenu = async (url, option, reRender) => {
    const data = await fetchData(url);
    switch (option){
        case 'default':{
            reRender(data);
            break;
        }
        case 'priceLow':{
            const sorted = [...data].sort((a, b) => a.price - b.price);
            console.log(sorted);
            reRender(sorted);
            break;
        }
        case 'priceHigh':{
            const sorted = [...data].sort((a, b) => b.price - a.price);
            reRender(sorted);
            break;
        }
        
    }
}

export const dropDownClose = (e) => {
    const dropDownBtn = document.querySelector(".dropdown-btn");
    const icon = dropDownBtn.querySelector('i');
    const optionsBox = document.querySelector(".options-box");
    optionsBox.classList.remove("show");
    icon.classList.toggle('bi-chevron-down');
    icon.classList.toggle('bi-chevron-up');
    dropDownBtn.querySelector('.chosen').textContent = e.target.textContent;
}