import { addToCart } from './script.js';
import { toggleInfo } from './script.js';


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




const coffeeTemplate = document.getElementById('coffee-template');
const menuContainer = document.getElementById('coffee-menu');

const renderMenu = (data) => {
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
        clone.querySelector('.toggle-info').addEventListener('click', toggleInfo);

        container.appendChild(clone);
    });

    menuContainer.appendChild(container);
    
};

const renderPage = async () => {
    const data = await fetchData();
    renderMenu(data);
}

document.addEventListener('DOMContentLoaded', () => {
    renderPage();
});