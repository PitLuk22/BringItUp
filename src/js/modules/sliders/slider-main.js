import Slider from './slider';

export default class MainSlider extends Slider {
    constructor(btns, next, prev) {
        super(btns, next, prev);
    }

    showSlide(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = this.slides.length;
        }
        // delete all slides
        this.slides.forEach(slide => {
            slide.classList.add('animated');
            slide.classList.remove('slideInUp');
            slide.style.display = 'none';
        });
        // show certain slide
        this.slides[this.slideIndex - 1].style.display = 'block';
        this.slides[this.slideIndex - 1].classList.add('slideInUp');

        // set timeout on the third slide for popup card
        if (this.hanson) {
            if (n === 3) {
                setTimeout(() => {
                    this.hanson.style.display = 'block';
                    this.hanson.classList.add('animated', 'slideInUp');
                }, 3000);
            } else {
                this.hanson.style.display = 'none';
            }
        }
    }

    plusSlide(n) {
        this.showSlide(this.slideIndex += n);
    }

    bindTriggers() {

        this.btns.forEach(btn => {

            // click on main btn in the bottom-left corner
            btn.addEventListener('click', () => {
                this.plusSlide(1);
            });

            // click on logo and set first slide
            btn.parentElement.previousElementSibling.addEventListener('click', (event) => {
                event.preventDefault();
                this.slideIndex = 1;
                this.showSlide(this.slideIndex);
            });
        });

        // click in modules page
        this.next.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlide(1);
            });
        });
        // click in modules page
        this.prev.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlide(-1);
            });
        });
    }

    render() {
        if (this.container) {

            // get popup card
            try {
                this.hanson = document.querySelector('.hanson');
            } catch (e) {}

            this.showSlide(this.slideIndex);

            this.bindTriggers();
        }
    }
}