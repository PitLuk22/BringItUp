export default class ShowInfo {
    constructor(block) {
        this.blocks = document.querySelectorAll(block);
    }

    init() {

        this.blocks.forEach(elem => {
            const info = elem.nextElementSibling;
            info.classList.add('animated', 'fadeInUp');
            elem.querySelector('.plus').addEventListener('click', () => {
                elem.remove();
                info.style.display = 'block';
            });

        });

    }
}