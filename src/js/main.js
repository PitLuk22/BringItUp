import Difference from './modules/difference';
import Form from './modules/form';
import MainSlider from './modules/sliders/slider-main';
import MiniSlider from './modules/sliders/slider-mini';
import VideoPlayer from './modules/videoPlayer';

window.addEventListener('DOMContentLoaded', () => {

    new VideoPlayer('.showup .play', '.overlay').init();
    new VideoPlayer('.moduleapp .play', '.overlay').init();

    const slider = new MainSlider({
        container: '.page',
        btns: '.next'
    });
    slider.render();

    const modulePageSlider = new MainSlider({
        container: '.moduleapp',
        btns: '.next'
    });
    modulePageSlider.render();

    const moduleApp = new MainSlider({
        container: '.moduleapp',
        prev: '.module__info-controls .prev',
        next: '.module__info-controls .next'
    });
    moduleApp.render();

    const showUpSlider = new MiniSlider({
        container: '.showup__content-slider',
        prev: '.showup__prev',
        next: '.showup__next',
        activeClass: 'card-active',
        animateActiveElem: true
    });
    showUpSlider.init();

    const modulesSlider = new MiniSlider({
        container: '.modules__content-slider',
        prev: '.modules__info-btns .slick-prev',
        next: '.modules__info-btns .slick-next',
        activeClass: 'card-active',
        autoplay: false
    });
    modulesSlider.init();

    const feedSlider = new MiniSlider({
        container: '.feed__slider',
        prev: '.feed__slider .slick-prev',
        next: '.feed__slider .slick-next',
        activeClass: 'feed__item-active'
    });
    feedSlider.init();

    new Difference('.officerold', '.officernew', '.officer__card-item').init();

    new Form('form', 'assets/question.php').init();

});