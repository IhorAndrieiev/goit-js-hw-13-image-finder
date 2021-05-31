import './sass/main.scss';
//var debounce = require('lodash.debounce');
// import './js/index1';
import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import NewsApiService from './js/serv'
import imgMarkup from './templates/photo-card.hbs';
import * as basicLightbox from 'basiclightbox';




const refs = {
    searchForm: document.querySelector(".search-form"),

    photoGalleryUl: document.querySelector(".js-photos-gallery"),
    imputSearh: document.querySelector('[name=query]'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

refs.searchForm.addEventListener('submit', onFormSearch);
 
const newsApiService = new NewsApiService();

function onFormSearch(e) {
    e.preventDefault();
    
    
    newsApiService.query = e.target.elements.query.value; //callback
    //const searchQuery = e.target.elements.query.value;
        //console.log(searchQuery)
    if (newsApiService.query.trim() === '') {
        refs.loadMoreBtn.disabled = true;
         return info({
      text: 'Ведите что нибудь!!',
      delay: 4000,
      closerHover: true,
    });
    }
    
    refs.loadMoreBtn.disabled = false;
    clearList();
    newsApiService.resetPage();
    newsApiService.fetchImage()
        .then(renderFotosCard)
        .catch(onFetchError)
    refs.photoGalleryUl.innerHTML = ''
    e.target.reset();
}

function renderFotosCard(hits) {
    if (hits.length < 1) {
        refs.loadMoreBtn.disabled = true;
        error({
                text: 'Ведите другой запрос, такого запроса нет!',
                daily: 4000,
                closerHover: true,
            });
    }
    refs.photoGalleryUl.insertAdjacentHTML('beforeend', imgMarkup(hits));
}


function clearList() {
  refs.photoGalleryUl.innerHTML = '';
}

function onFetchError(error) {
         error({
                text: 'Все пропало!',
                daily: 4000,
                closerHover: true,
            });
         //alert('error набери больше букв')
}

// onLoadMore();
 refs.loadMoreBtn.addEventListener('click', onLoadMore);    
function onLoadMore () {
  newsApiService.fetchImage().then(renderFotosCard)
}



// async function fetchCreateMarcupLoadMore() {
//   try {
//     const hits = await apiService.searchImages();
//     markup(hits);
//     const standartL = refs.photoGalleryUl.children.length;

//     // if (standartL !== 0) {
//     //   const getTop = standartL - 12;
//     //   const name = containerCard.children[`${getTop}`];
//     //   console.log(getTop);
//     //   window.scrollTo({
//     //     top: name,
//     //     left: 0,
//     //     behavior: 'smooth',
//     //   });
//     // }
//     const getTop = standartL - 12;
//     animateScrollTo(refs.photoGalleryUl.children[`${getTop}`], {
//       speed: 500,
//       maxDuration: 3000,
//       verticalOffset: -20,
//     });
//     if (hits.length === 0) {
//       btnEl.disabled = true;
//     }
//   } catch (error) {
//     console.warn(error);
//   }
// }

// function markup(data) {
//   const cards = fotoCard(data);
//   refs.photoGalleryUl.insertAdjacentHTML('beforeend', cards);
// }