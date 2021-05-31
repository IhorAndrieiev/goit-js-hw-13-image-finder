const BASE_URL = 'https://pixabay.com/api/?';
const MY_KEY = 'key=21807236-1153745d4e037ea07ba98184d';

export default class NewApiService {
  constructor() {
    this.search = '';
    this.page = '1';
    this.per_page = 12;
    }
    
     fetchImage() {
    const url = `${BASE_URL}image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=${this.per_page}&${MY_KEY}`;
         return fetch(url)
             .then(res => res.json())
             .then(({ hits }) => {
             this.incrementPage();
                 return hits;
         });
   }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.search;
  }
  set query(newQuery) {
    this.search = newQuery;
  }
}