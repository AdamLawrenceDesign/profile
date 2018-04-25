import { StateManager } from './state-manager';

export class SummaryPage {

    constructor(container, reset) {
        this.container = container;
        this.reset = reset;

        this.stateManager = new StateManager(this.container);

    }

    show(context) {

        var source = document.getElementById('page__summary');
        var template = Handlebars.compile(source.innerHTML);
        var partial = document.getElementById('template__location-result');
        Handlebars.registerPartial('location', partial.innerHTML);

        var result = template(context);

        this.container.insertAdjacentHTML('afterbegin', result);
        this.htmlElement = this.container.querySelector('#summary');

        this.stateManager.enterChildren(this.htmlElement);
        this.addListeners(this.htmlElement);
        this.stateManager.enterChildrenAfter(this.htmlElement);

    }

    addListeners(container) {
        // this.startBtn = container.querySelector('.summary__start-btn');
        this.resetBtn = container.querySelector('.summary__reset-btn');
        // this.closeBtn = container.querySelector('.summary__close-btn');
        // this.startBtn.addEventListener('click', this.destroy.bind(this), false);
        this.resetBtn.addEventListener('click', this.destroy.bind(this), false);
        // this.closeBtn.addEventListener('click', this.destroy.bind(this), false);
    }

    hide() {
        if (!this.htmlElement) {
            return;
        }

        this.stateManager.leave(this.htmlElement, () => {
            this.container.removeChild(this.htmlElement);
            this.htmlElement = null;
        });
    }

    destroy() {
        if (!this.htmlElement) {
            return;
        }

        this.stateManager.leave(this.htmlElement, () => {
            // remove from DOM
            this.container.removeChild(this.htmlElement);
            this.htmlElement = null;

            this.reset();
        });
    }



}