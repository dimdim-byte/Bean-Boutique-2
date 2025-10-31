import {fetchData } from './script.js';
import {cloneCardTemplate} from './script.js'
import { sortMenu } from './script.js';
import { dropDownClose } from './script.js';

const fetchUrl = '../data/equipmentData.json';

const equipmentTemplate = document.getElementById('equipment-template');
const menuContainer = document.getElementById('equipmentMenu');
const container = document.querySelector('.equipment-container');

const renderMenu = (data) => {
   
    container.innerHTML = "";
    
    data.forEach(element => {  
        const clone = equipmentTemplate.content.cloneNode(true);
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