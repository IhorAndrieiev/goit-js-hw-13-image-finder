import imgMarkup from './../templates/photo-card.hbs';
import refs from './refs'

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

export default renderFotosCard;