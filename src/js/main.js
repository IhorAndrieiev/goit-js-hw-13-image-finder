import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

// const debounce = require('lodash.debounce');
import '../sass/main.scss';
// import fotoCard from './templates/photo-card.hbs';
// import API from './js/api-servise';

//  fetch('https://pixabay.com/api/?key=21807236-1153745d4e037ea07ba98184d&q=dog&image_type=photo&per_page=10&page=1',
//     ).then(r => r.json()).then(console.log);


const refs = {
    searchForm: document.querySelector(".search-form"),
    photoGalleryUl: document.querySelector(".js-photos-gallery")
}

refs.searchForm.addEventListener('submit', onImputSearch);

function onImputSearch(e) {
    e.preventDefault();

    const searchQuery = e.target.elements.query.value;
        console.log(searchQuery)
    // API.fetchPhotos(searchQuery.trim())
    //     .then(renderCountriesCard)
    //     .catch(onFetchError)
}