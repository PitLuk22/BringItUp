export default class Slider {
    constructor({
        container = null,
        btns = null,
        next = null,
        prev = null,
        svg = null,
        activeClass = '',
        animateActiveElem,
        autoplay
    } = {}) {
        this.container = document.querySelector(container);
        try {
            this.slides = this.container.children;
        } catch (e) {}
        this.btns = document.querySelectorAll(btns);
        this.svg = document.querySelectorAll(svg);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.activeClass = activeClass;
        this.animateActiveElem = animateActiveElem;
        this.autoplay = autoplay;
        this.slideIndex = 1;
    }


}