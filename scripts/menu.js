const fetchUrl = "../data/data.json";
const fetchData = async () => {
    try {
        const res = await fetch(fetchUrl);
        if (!res.ok){
            throw new Error("Failed to load resources");
        }
        const data = await res.json();
        return data;
    } catch (e){
        console.log(e)
    }
};

const addToCart = (e) => {
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
};


const coffeeTemplate = document.getElementById('coffee-template');
const menuContainer = document.getElementById('coffee-menu');

const renderMenu = async () => {
    const data = await fetchData();
    const container = document.createElement('div');
    container.classList.add("row", "g-4", "justify-content-center");

    data.forEach(element => {
        const clone = coffeeTemplate.content.cloneNode(true);

        clone.querySelector('.coffee-img').src = element.image;
        clone.querySelector('.coffee-img').alt = element.name;
        clone.querySelector('h3').textContent = element.name;
        clone.querySelector('.coffee-price').textContent = `$${element.price.toFixed(2)}`;
        clone.querySelector('.coffee-card').setAttribute('data-name', element.name);
        clone.querySelector('.bean-img').src = element.beanImg;
        clone.querySelector('.bean-img').alt = `${element.name} Bean`;
        clone.querySelector('.coffee-info p').textContent = element.description;
        clone.querySelector('.add-to-cart-btn').textContent = "Add to Cart";
        clone.querySelector('.add-to-cart-btn').dataset.price = element.price;
        clone.querySelector('.add-to-cart-btn').addEventListener('click', addToCart);

        container.appendChild(clone);
    });

    menuContainer.appendChild(container);
    
};

document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
});