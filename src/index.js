import './styles.css';
import 'material-design-icons/iconfont/material-icons.css';
import imgService from './js/img-service';
import './js/refs';
import galleryListTpl from './templates/gallery.hbs';
import onImgClick from './js/basiclightbox';
//import { error, alert } from './js/notifications';

function updateGalleryListMarkup(data) {
  const markup = galleryListTpl(data);
  return refs.galleryList.insertAdjacentHTML('beforeend', markup);
}

function onFormSubmit(event) {
  event.preventDefault();
  console.log(event.currentTarget.elements);
  const form = event.currentTarget;
  imgService.query = form.elements.query.value;
  imgService.resetPage();
  fetchGalleryList();
  refs.galleryList.innerHTML = '';
  form.reset();
}

refs.searchForm.addEventListener('submit', onFormSubmit);
refs.galleryList.addEventListener('click', onImgClick);

refs.loadMoreBtn.addEventListener('click', fetchGalleryList)

function fetchGalleryList() {
  refs.loadMoreBtn.classList.add('is-hidden');
  refs.loader.classList.remove('is-hidden');
      imgService.fetchImages().then(hits => {
      if (hits.length === 0) {
        error({
          title: 'Not valid request',
          text: 'Specify your request',
          delay: 2000,
        });
      }
        updateGalleryListMarkup(hits);
        refs.loadMoreBtn.classList.remove('is-hidden');

        window.scrollTo({
          top: document.documentElement.offsetHeight,
          behavior: "smooth"
        });
      }).finally(() => {
        refs.loader.classList.add('is-hidden');
    })
}

//Back to top button
function trackScroll() {
  const scrolled = window.pageYOffset;
  const coords = document.documentElement.clientHeight;
  if (scrolled > coords) {
    goTopBtn.classList.add('back_to_top-show');
  }
  if (scrolled < coords) {
    goTopBtn.classList.remove('back_to_top-show');
  }
}
function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -80);
    setTimeout(backToTop, 0);
  }
}
const goTopBtn = document.querySelector('.back_to_top');
window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', backToTop);