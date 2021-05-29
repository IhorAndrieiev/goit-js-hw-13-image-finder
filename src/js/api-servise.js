import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/?';
const MY_KEY = 'key=21807236-1153745d4e037ea07ba98184d';

axios.defaults.baseURL = `${BASE_URL}image_type=photo&orientation=horizontal`;

export default function sendRequest(query, page) {
  return axios.get(
    `&q=${query}&page=${page}&per_page=12&${MY_KEY}`,
  );
}

// function fetchPhotos() {
//     return fetch(`${BASE_URL}${MY_KEY}&q=${searchQueryKeyword}&image_type=photo&per_page=${per_page}&per_page=${page}`,
//     ).then(r => r.json());
// }
// export default { fetchPhotos };
//https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ


// export default class ApiService {
//   constructor() {
//     this.search = '';
//     this.page = '1';
//     this.per_page = 12;
//     }
    
//      async searchImages() {
//     const url = `${BASE_URL}image_type=photo&orientation=horizontal&q=${this.search}&page=${this.page}&per_page=${this.per_page}&${MY_KEY}`;

//     this.incrementPage();

//         return (await (await fetch(url)).json()).hits;
//    }
//   incrementPage() {
//     this.page += 1;
//   }
//   resetPage() {
//     this.page = 1;
//   }

//   get query() {
//     return this.search;
//   }
//   set query(newQuery) {
//     this.search = newQuery;
//   }
// }