import { StateManager } from './state-manager';

export class Navigation {

    constructor(container, navigateTo) {
        this.container = container;
        this.navigateTo = navigateTo;

        this.addListeners();

    }

    addListeners() {

        var homeBtn = this.container.querySelector('#nav__home');
        homeBtn.addEventListener('click', this.showHome.bind(this), false);

        // var summaryBtn = this.container.querySelector('#nav__summary');
        // summaryBtn.addEventListener('click', this.showSummary.bind(this), false);

    }

    showHome() {
        this.navigateTo('/home');
    }

    showSummary() {
        this.navigateTo('/summary');
    }

}
