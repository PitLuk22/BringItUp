export default class Form {
    constructor(forms, path) {
        this.forms = document.querySelectorAll(forms);
        this.message = {
            successText: 'Thank you! We will phone you back!',
            failText: 'Sorry, something went wrong! Try it later!',
            successImg: 'assets/icons/success.svg',
            failImg: 'assets/icons/fail.svg',
            spinner: 'assets/icons/spinner.svg',
        };
        this.path = path;
        this.overlay = document.querySelector('.overlay__form');
    }

    init() {
        this.forms.forEach(form => {
            this.validateEmail(form);
            this.submit(form);
        });
        this.initMask();
    }

    submit(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const modal = this.overlay.children[0];

            // Create IMG block and start spinner
            const statusImg = document.createElement('img');
            statusImg.classList.add('overlay__form-img');
            statusImg.setAttribute('src', this.message.spinner);
            modal.appendChild(statusImg);

            // Create TEXT block
            const statusText = document.createElement('div');
            statusText.classList.add('overlay__form-text');
            modal.appendChild(statusText);

            // Show overlay
            this.overlay.style.display = 'flex';

            const formData = new FormData(form);

            this.postData(this.path, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', this.message.successImg);
                    statusText.textContent = this.message.successText;
                })
                .catch(() => {
                    statusImg.setAttribute('src', this.message.failImg);
                    statusText.textContent = this.message.failText;
                })
                .finally(() => {
                    form.reset();
                    this.clearInputs();
                    setTimeout(() => {
                        modal.classList.add('animated', 'zoomOut');
                        setTimeout(() => {
                            modal.classList.remove('zoomOut');
                            this.overlay.style.display = 'none';
                            statusImg.remove();
                            statusText.remove();
                        }, 500);
                    }, 3000);
                });
        });
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });
        if (!res.ok) {
            throw Error('Something went wrong!');
        }
        return await res.text();
    }


    validateEmail(form) {
        const email = form.querySelector('[name="email"]');
        email.addEventListener('keypress', function (event) {
            // allow only a-z, 0-9, @, \., \-
            if (event.key.match(/[^a-z 0-9 @ \. \-]/ig)) {
                event.preventDefault();
            }
        });
    }

    clearInputs() {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(item => {
            item.value = '';
        });
    }

    initMask() {
        const inputs = document.querySelectorAll('[name="phone"]');

        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);

            // don't allow moving cursor to the left
            input.addEventListener('click', function () {
                input.setSelectionRange(2, 2);
            });
            input.addEventListener('keydown', function (event) {
                if (event.keyCode == 37 && input.selectionStart == 2) {
                    event.preventDefault();
                }
            });
        });

        // set cursor position 
        let setCursorPosition = (pos, elem) => {
            elem.focus();

            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();

                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };

        function createMask(event) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');

            if (def.length >= val.length) {
                val = def;
            }

            this.value = matrix.replace(/./g, function (a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });

            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }



    }









}