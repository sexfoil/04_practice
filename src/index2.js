import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getCharacters } from './lotr-api';


const elements = {
    searchForm: document.querySelector('.search-form'),
    sortingButton: document.querySelector('button[type="submit"]'),
    gallery: document.querySelector('.gallery'),
    guard: document.querySelector('.js-guard')
}

const PER_PAGE = 20;

let total = 0;
let page = 1;
let sorting = '';

const guardOptions = {
    root: null,
    rootMargin: "300px",
    treshhold: 1.0
}

const scrollObserver = new IntersectionObserver(handlerLoadMore, guardOptions);

function handlerLoadMore(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            page += 1;
            const searchResult = getCharacters(page, sorting);
    
            searchResult
                .then(result => {                    
                    renderResult(result.data);

                    if (PER_PAGE * page >= total) {
                        scrollObserver.unobserve(elements.guard);
                    }
                })
                .catch(err => showErrorMessage(err.message));
        }
    });
}



function getListItemsHTML(docs) {
    return docs.map(({ name, race = 'Unknown race' }) => {
        return `            
                <div class="photo-card">                    
                    <div class="info">
                        <p class="info-item">
                            <b>Name</b>
                            <span>${name}</span> 
                        </p>
                        <p class="info-item">
                            <b>Race</b>
                            <span>${race}</span>
                        </p>                        
                    </div>
                </div>            
        `
    }).join('');
}

function renderResult(data) {
    console.log(data.docs);
    elements.gallery.insertAdjacentHTML('beforeend', getListItemsHTML(data.docs));
    
    const { height: cardHeight } = elements.gallery.firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}

function showErrorMessage(errorMessage) {
    iziToast.show({
        message: errorMessage,
        messageColor: 'white',
        backgroundColor: 'tomato',
        timeout: 2500,
        position: 'topRight'
    });
}

function resetData() {
    elements.gallery.innerHTML = '';
    total = 0;
    page = 1;
    sorting = '';
}

function onSortingButtonClick(evt) {
    evt.preventDefault();
    resetData();

    const form = new FormData(elements.searchForm);
    const input = form.get('sorting').trim().toLowerCase();
    sorting = (input === 'asc' || input === 'desc') ? input : '';
    console.log(sorting);
    const searchResult = getCharacters(1, `name:${sorting}`);
    
    searchResult
        .then(result => {
            if (result.status >= 400) {
                throw new Error("Error");
            }

            console.log(result.data);
            total = result.data.total;
            renderResult(result.data);

            if (PER_PAGE * page < total) {
                scrollObserver.observe(elements.guard);
            }
        })
        .catch(err => console.log(err));
}

elements.sortingButton.addEventListener('click', onSortingButtonClick);
