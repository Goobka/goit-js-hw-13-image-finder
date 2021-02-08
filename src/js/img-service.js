export default {
    searchQuery: '',
    page: 1,
    fetchImages() {
        const apiKey = "20010516-1aac730e4e83c98dd9531c169";
        const url = `https://pixabay.com/api/?key=${apiKey}&q=${this.query}&image_type=photo&orientation=horizontal&page=${this.page}&per_page=12`;

        return fetch(url).then(res => res.json()).then(({ hits }) => {
            this.incrementPage();
            return hits;
        }).catch(error => console.log(error))
    },
    resetPage() {
        this.page = 1;
    },
    incrementPage() {
        this.page += 1;
    },
    get query() {
        return this.searchQuery;
    },
    set query(value) {
        this.searchQuery = value;
    },
};