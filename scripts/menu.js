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
const container = document.querySelector('.coffee-container');

const renderMenu = (data) => {
   
    container.innerHTML = "";

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

const sortMenu = async (option) => {
    const data = await fetchData();
    switch (option){
        case 'default':{
            renderMenu(data);
            break;
        }
        case 'priceLow':{
            const sorted = [...data].sort((a, b) => a.price - b.price);
            console.log(sorted);
            renderMenu(sorted);
            break;
        }
        case 'priceHigh':{
            const sorted = [...data].sort((a, b) => b.price - a.price);
            renderMenu(sorted);
            break;
        }
        
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderPage();

    const dropDownBtn = document.querySelector(".dropdown-btn");
    const icon = dropDownBtn.querySelector('i');
    const optionsBox = document.querySelector(".options-box");

    dropDownBtn.addEventListener('click', () => {
        
         requestAnimationFrame(() => {
            optionsBox.classList.toggle("show");
        });
        icon.classList.toggle('bi-chevron-down');
        icon.classList.toggle('bi-chevron-up');
    })

    document.querySelectorAll(".options").forEach(option => {
        option.addEventListener('click', (e) => {
            const chosen = e.target.dataset.option;
            optionsBox.classList.remove("show");
            icon.classList.toggle('bi-chevron-down');
            icon.classList.toggle('bi-chevron-up');
            dropDownBtn.querySelector('.chosen').textContent = e.target.textContent;
            console.log(chosen);
            sortMenu(chosen);
        });

    })
});