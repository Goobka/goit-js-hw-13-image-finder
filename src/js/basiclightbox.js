import 'basiclightbox/src/styles/main.scss';

import * as basicLightbox from 'basiclightbox';

function onImgClick(event) {
    if (event.target.nodeName === 'IMG') {
        const lightboxImg = event.target.dataset.source;
        console.log(lightboxImg);
        basicLightbox.create(`
            <img src="${lightboxImg}" />
        `).show();
    }
}

export default onImgClick;