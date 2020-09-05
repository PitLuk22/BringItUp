export default class MultiPage {
    constructor(mainUrl, secondUrl) {
        this.main = mainUrl;
        this.second = secondUrl;
    }

    init() {
        document.querySelectorAll('.menu__block-schedule').forEach(elem => {
            elem.addEventListener('click', () => {
                let currentUrl = window.location.href;
                if (currentUrl === this.main) {
                    window.location.href = this.second;
                } else {
                    window.location.href = this.main;
                }
            });
        });
    }
}