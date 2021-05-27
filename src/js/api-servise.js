const BASE_URL = 'https://pixabay.com/api/?';
const MY_KEY = 'key=21807236-1153745d4e037ea07ba98184d';

function fetchPhotos() {
    return fetch(`${BASE_URL}${MY_KEY}&q=${searchQueryKeyword}&image_type=photo&per_page=${per_page}&per_page=${page}`,
    ).then(r => r.json());
}
export default { fetchPhotos };