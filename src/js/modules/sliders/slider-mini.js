import Slider from './slider';

export default class MiniSlider extends Slider {
    constructor(container, prev, next, activeClass, animateActiveElem, autoplay) {
        super(container, prev, next, activeClass, animateActiveElem, autoplay);
    }

    init() {
        this.container.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start; 
        overflow: hidden;
        `;

        this.bindTriggers();
        this.decorateSLides();

        if (this.autoplay) {
            this.initAutoPlay();
        }
    }
    //card__description
    //card__controls
    decorateSLides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animateActiveElem) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        this.slides[0].classList.add(this.activeClass);
        if (this.animateActiveElem) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    bindTriggers() {
        this.next.addEventListener('click', (e) => {
            for (let i = 1; i < this.slides.length; i++) {
                if (this.slides[i].tagName === 'BUTTON') {
                    this.container.appendChild(this.slides[i]);
                    console.log(i);
                    i--;
                } else {
                    this.container.appendChild(this.slides[0]);
                    this.decorateSLides();
                    break;
                }
            }
        });

        this.prev.addEventListener('click', (e) => {
            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName === 'BUTTON') {
                    this.container.prepend(this.slides[i]);
                    i++;
                } else {
                    this.container.prepend(this.slides[this.slides.length - 1]);
                    this.decorateSLides();
                    break;
                }
            }
        });
    }

    initAutoPlay() {
        this.timerId = setInterval(() => {
            this.next.click();
        }, 4000);

        [this.container, this.next, this.prev].forEach(elem => {
            elem.addEventListener('mouseenter', () => {
                clearInterval(this.timerId);
            });
        });

        [this.container, this.next, this.prev].forEach(elem => {
            elem.addEventListener('mouseleave', () => {
                this.timerId = setInterval(() => {
                    this.next.click();
                }, 4000);
            });
        });
    }


}