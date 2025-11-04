import {fetchData } from './script.js';
import {cloneCardTemplate} from './script.js'
import { sortMenu } from './script.js';
import { dropDownClose } from './script.js';
import { search } from './script.js';

const fetchUrl = '../data/equipmentData.json';

const equipmentTemplate = document.getElementById('equipment-template');
const menuContainer = document.getElementById('equipmentMenu');
const container = document.querySelector('.equipment-container');

let equipmentData = [];

const renderMenu = (data) => {
   
    container.innerHTML = "";
    
    data.forEach(element => {  
        const clone = equipmentTemplate.content.cloneNode(true);
        const cloneNode = cloneCardTemplate(clone, element);
        container.appendChild(cloneNode);
    });

    
     if (data.length === 0){
        const emptyMessage = document.createElement("div");
        emptyMessage.style.textAlign = "center";
        emptyMessage.style.margin = "100px"
        emptyMessage.style.fontSize = "1.5em";
        emptyMessage.style.opacity = 0.5;
        emptyMessage.innerHTML = `Not found <i class="bi bi-cup-hot"></i>`;
        container.appendChild(emptyMessage);
        
    }

    menuContainer.appendChild(container);
    
};

const renderPage = async () => {
    const data = await fetchData(fetchUrl);
    renderMenu(data);
    equipmentData = data;
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
            sortMenu(equipmentData, chosen, renderMenu);
        });

    })

    document.getElementById("searchBtn").addEventListener('click', () => {
            const searchTarget = document.getElementById("searchInput").value.toLowerCase().trim();
            const filtered = search(equipmentData, searchTarget);
            renderMenu(filtered);
    })

    document.getElementById("searchInput").addEventListener('keydown', (e) => {
            const searchTarget = e.target.value.toLowerCase().trim();
            if (e.key == "Enter"){
                const filtered = search(equipmentData, searchTarget);
                renderMenu(filtered);
            }
    })
});