import {fetchData } from './script.js';
import {cloneCardTemplate} from './script.js'
import { sortMenu } from './script.js';
import { dropDownClose } from './script.js';
import { search } from './script.js';

const fetchUrl = '../data/coffeeData.json';

const coffeeTemplate = document.getElementById('coffee-template');
const menuContainer = document.getElementById('coffee-menu');
const container = document.querySelector('.coffee-container');

let menuData = [];

const renderMenu = (data) => {
   
    container.innerHTML = "";
    
    data.forEach(element => {  
        const clone = coffeeTemplate.content.cloneNode(true);
        const cloneNode = cloneCardTemplate(clone, element);
        container.appendChild(cloneNode);
    });

    menuContainer.appendChild(container);
    
};
const renderPage = async () => {
    const data = await fetchData(fetchUrl);
    renderMenu(data);
    menuData = data;
    console.log(menuData)
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
            dropDownClose(e);
            const chosen = e.target.dataset.option;
            sortMenu(menuData, chosen, renderMenu);
        });

    })

    document.getElementById("searchBtn").addEventListener('click', () => {
        const searchTarget = document.getElementById("searchInput").value.toLowerCase().trim();
        const filtered = search(menuData, searchTarget);
        renderMenu(filtered);
    })
});

