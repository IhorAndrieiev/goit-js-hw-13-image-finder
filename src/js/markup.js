import imgMarkup from './../templates/photo-card.hbs';
import refs from './refs'

import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

function renderFotosCard(hits) {
    if (hits.length < 1) {
        refs.loadMoreBtn.disabled = true;
        error({
                text: 'Ведите другой запрос, такого запроса нет!',
                daily: 3000,
                closerHover: true,
            });
    }
    refs.photoGalleryUl.insertAdjacentHTML('beforeend', imgMarkup(hits));
}

export default renderFotosCard;