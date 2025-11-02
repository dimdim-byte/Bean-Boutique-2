import {fetchData } from './script.js';
import {cloneCardTemplate} from './script.js'
import { sortMenu } from './script.js';
import { dropDownClose } from './script.js';

const fetchUrl = '../data/coffeeData.json';

const coffeeTemplate = document.getElementById('coffee-template');
const menuContainer = document.getElementById('coffee-menu');
const container = document.querySelector('.coffee-container');

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
            sortMenu(fetchUrl, chosen, renderMenu);
        });

    })
});

document.getElementById("searchBtn").addEventListener('click', async (e) => {
    const search =document.getElementById("searchInput").value.toLowerCase().trim();
    const data = await fetchData(fetchUrl);

    const filtered = [...data].map(item => {
        item.score = 0;
        search.split(" ").forEach(s => {
            switch (true){
            
            case s === item.name.toLowerCase():
                item.score += 20;
            case item.category.includes(s):
                item.score += 5;
            case item.name.toLowerCase().includes(s):
                item.score += 10;   
        }
        })

        return item;
    }).filter(item => item.score > 0).sort((a, b) => b.score - a.score).splice(0, 10)
    console.log(filtered);
    renderMenu(filtered);
})