import './styles.css';
import 'material-design-icons/iconfont/material-icons.css';
import imgService from './js/img-service';
import galleryListTpl from './templates/gallery.hbs';
import onImgClick from './js/basiclightbox';
import './js/components/back-to-top-btn';
//import LoadMoreBtn from './js/components/load-more-btn';
import error from './js/notifications';

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  searchForm: document.querySelector('.search-form'),
  sentinel: document.querySelector('#sentinel'),
}

// const loadMoreBtn = new LoadMoreBtn({
//   selector: '[data-action="load-more"]',
//   hidden: true,
// });

refs.searchForm.addEventListener('submit', onFormSubmit);
refs.galleryList.addEventListener('click', onImgClick);
// loadMoreBtn.refs.button.addEventListener('click', fetchGalleryList)

function onFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  imgService.query = form.elements.query.value;
  // loadMoreBtn.show();
  imgService.resetPage();
  if (imgService.query) {
    fetchGalleryList();
  };
  clearGalleryList();
  form.reset();
}

function fetchGalleryList() {
  // loadMoreBtn.disable();
    imgService.fetchImages().then(hits => {
      if (imgService.query === '' || hits.length === 0) {
        error({
          title: 'Not valid request',
          text: 'Specify your request',
          delay: 1000,
        });
      }
        updateGalleryListMarkup(hits);
        // loadMoreBtn.enable();
        // window.scrollTo({
        //   top: document.documentElement.offsetHeight,
        //   behavior: "smooth"
        // });
    })
}

function updateGalleryListMarkup(data) {
  const markup = galleryListTpl(data);
  return refs.galleryList.insertAdjacentHTML('beforeend', markup);
}

function clearGalleryList() {
  refs.galleryList.innerHTML = '';
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && imgService.query !== '') {
      fetchGalleryList();
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});
observer.observe(refs.sentinel);
