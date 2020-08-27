export default class Downlad {
    constructor(triggers) {
        this.btns = document.querySelectorAll(triggers);
        this.path = 'assets/img/Bitmap.jpg';
    }

    init() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // "stopPrapogation" doesn't allow pages switching
                e.stopPrapogation();
                this.downloadItem(this.path);
            });
        });
    }

    downloadItem(path) {
        // We need to create a link anywhere and after clicking we need remove it 
        const link = document.createElement('a');
        link.setAttribute('href', path);
        link.setAttribute('download', 'nice_picture');
        link.style.display = 'none';

        document.body.appendChild(link);

        link.click();

        link.remove();
    }
}