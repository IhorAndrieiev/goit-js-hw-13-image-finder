import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

// const debounce = require('lodash.debounce');
import './../sass/main.scss';
import sendRequest from './api-servise';
import imgMarkup from './../templates/photo-card.hbs';
import * as basicLightbox from 'basiclightbox';


 
const galleryRef = document.querySelector(".js-photos-gallery");
const formRef = document.querySelector(".search-form");
const loadMoreButtonRef = document.querySelector('[data-action=load]')

const params = {
    page: 1,
    query: '',
};

const observeOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
}

function getPictures(query, pageNamber, callback) {
    callback(query, pageNamber).then(({ data: { hits } }) => {
        galleryRef.insertAdjacentHTML('beforeend', imgMarkup(hits));
        loadMoreButtonRef.style.visibility = 'visible';
        if (hits.length < 1) {
            galleryRef.innerHTML = '';
            loadMoreButtonRef.style.visibility = 'hidden';
            error({
                text: 'Ведите что нибудь!',
                daily: 3000,
                closerHover: true,
            });
        }
    })
}

formRef.addEventListener('submit', e => {
    e.preventDefault();
    if (params.query !== e.target.children[0].value) {
        params.page = 1;
        galleryRef.innerHTML = '';
        loadMoreButtonRef.style.width = loadMoreButtonRef.style.height = 'auto';
    };
    params.query = e.target.children[0].value;
    getPictures(params.query, params.page, sendRequest);

})

galleryRef.addEventListener('click', e => {
    if (e.target.localName === 'img') {
        basicLightbox.create(`<img src=${e.target.dataset.source} width="800" height="600">`).show()
    }
});

function scrollToNewElements() {
    const totalScrollHeight = galleryRef.clientHeight + 80
    setTimeout(() => {
        window.scrollTo({
            top: totalScrollHeight,
            behavior: 'smooth',
        });
    }, 500)
}

function loadMoreImage() {
    params.page += 1;
    getPictures(params.query, params.page, sendRequest);
}

loadMoreButtonRef.addEventListener('click', () => {
    loadMoreImage();
    scrollToNewElements();
    const targets = document.getElementsByClassName('load');
    const observer = new IntersectionObserver(loadMoreImage, observeOptions);
    targets.forEach(target => {
        observer.observe(target)
    })
});


// import fotoCard from './templates/photo-card.hbs';
//  import ApiService from './api-servise';

//  fetch('https://pixabay.com/api/?key=21807236-1153745d4e037ea07ba98184d&q=dog&image_type=photo&per_page=10&page=1',
//     ).then(r => r.json()).then(console.log);


// const refs = {
//     searchForm: document.querySelector(".search-form"),

//     photoGalleryUl: document.querySelector(".js-photos-gallery"),
//     imputSearh: document.querySelector('[name=query]'),
//     btnMuchMore: document.querySelector('[data-action=load]'),
// }

// refs.searchForm.addEventListener('submit', onFormSearch);

// const apiService = new ApiService();

// function onFormSearch(e) {
//     e.preventDefault();
//     clearList();
    
//     apiService.query = e.currentTarget.elements.query.value;
    // const searchQuery = e.target.elements.query.value;
    //     console.log(searchQuery)
    // API.fetchPhotos(searchQuery.trim())
    //     .then(renderCountriesCard)
    //     .catch(onFetchError)

//     if (apiService.query.trim() === '') {
//         refs.btnMuchMore.disabled = true;
//          return info({
//       text: 'Ведите что нибудь!!',
//       delay: 1500,
//       closerHover: true,
//     });
//     }
//     refs.btnMuchMore.disabled = false;
//     apiService.resetPage();
//     refs.photoGalleryUl.innerHTML = '';
//     fetchCreateMarcupLoadMore();
// }

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
// function clearList() {
//   refs.photoGalleryUl.innerHTML = '';
// }