export default class Difference {
    constructor(oldOfficer, newOfficer, items) {
        try {

            this.oldOfficer = document.querySelector(oldOfficer);
            this.newOfficer = document.querySelector(newOfficer);
            this.oldItems = this.oldOfficer.querySelectorAll(items);
            this.newItems = this.newOfficer.querySelectorAll(items);
            this.oldCounter = 0;
            this.newCounter = 0;

        } catch (e) {}
    }

    hideItems(items) {

        items.forEach((card, index, arr) => {
            if (index !== arr.length - 1) {
                card.classList.add('animated');
                card.style.display = 'none';
            }
        });
    }

    init() {
        try {

            this.hideItems(this.oldItems);
            this.hideItems(this.newItems);

            // Here we pass the plus, counter and array of elements inside the group
            this.bindTriggers(this.oldOfficer.querySelector('.plus'), this.oldCounter, this.oldItems);
            this.bindTriggers(this.newOfficer.querySelector('.plus'), this.newCounter, this.newItems);

        } catch (e) {}
    }

    bindTriggers(plus, count, items) {

        plus.addEventListener('click', () => {
            if (count !== items.length - 2) {
                items[count].classList.add('fadeIn');
                items[count].style.display = 'flex';
                count++;
            } else {
                items[items.length - 1].remove();
                items[count].style.display = 'flex';
            }

        });
    }

}