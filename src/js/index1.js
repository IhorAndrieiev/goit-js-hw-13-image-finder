import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import '../sass/main.scss';

import sendRequest from './api-servise';
import imgMarkup from './../templates/photo-card.hbs';
import * as basicLightbox from 'basiclightbox';

const galleryRef = document.querySelector(".js-photos-gallery");
const formRef = document.querySelector(".search-form");
const loadMoreButtonRef = document.querySelector('[data-action="load-more"]');

const params = {
    page: 1,
    query: ''
}

const observeOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0
}

function getPictures(query, pageNamber, callback) {
    callback(query, pageNamber)
        .then(({data: { hits }}) => {
        galleryRef.insertAdjacentHTML('beforeend', imgMarkup(hits));
        loadMoreButtonRef.style.visibility = 'visible'
        if (hits.length < 1) {
            galleryRef.innerHTML = ''
            loadMoreButtonRef.style.visibility = 'hidden'
            error({
                text: 'Ведите другой запрос, такого запроса нет!',
                daily: 4000,
                closerHover: true,
            });
        }
    })
}

formRef.addEventListener('submit', e => {
    e.preventDefault();
    if (params.query !== e.target.children[0].value) {
        params.page = 1
        galleryRef.innerHTML = ''
        loadMoreButtonRef.style.width = loadMoreButtonRef.style.height = 'auto'
    }
    params.query = e.target.children[0].value;
    getPictures(params.query, params.page, sendRequest);

})

galleryRef.addEventListener('click', e => {
    if (e.target.localName === 'img') {
        basicLightbox.create(`<img src=${e.target.dataset.source} width="1024" height="768">`).show()
    }
})

function scrollToNewElements() {
    const totalScrollHeight = galleryRef.clientHeight + 80
    setTimeout(() => {
        window.scrollTo({
            top: totalScrollHeight,
            behavior: 'smooth',
        });
    }, 500);
}

function loadMoreImage() {
    params.page += 1;
    getPictures(params.query, params.page, sendRequest);
}

loadMoreButtonRef.addEventListener('click', () => {
    loadMoreImage();
    scrollToNewElements();
    const targets = document.getElementsByClassName("load-more");
    const observer = new IntersectionObserver(loadMoreImage, observeOptions);
    targets.forEach(target => {
        observer.observe(target)
    })
});