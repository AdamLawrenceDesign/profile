import { StateManager } from './state-manager';

export class StartPage {

    constructor(container, start, restart) {
        this.container = container;
        this.start = start;
        this.restart = restart;

        this.stateManager = new StateManager(this.container);

        // Elements 
        this.startBtn;
        this.resetBtn;
        this.closeBtn;

        this.addTemplate();

        this.isStarted = false;

    }

    show() {
        this.stateManager.enterChildrenAfter(this.htmlElement);
    }

    hide() {
        this.stateManager.leaveChildrenAfter(this.htmlElement);
    }

    addTemplate() {
        var source = document.getElementById('page__start');
        var template = Handlebars.compile(source.innerHTML);
        var result = template({});

        this.container.insertAdjacentHTML('afterbegin', result);
        this.htmlElement = this.container.querySelector('#start-page');

        this.addListeners(this.htmlElement);
    }

    addListeners(container) {
        this.startBtn = container.querySelector('.start-page__start-btn');
        this.resetBtn = container.querySelector('.start-page__reset-btn');
        this.continueBtn = container.querySelector('.start-page__continue-btn');

        this.startBtn.addEventListener('click', this.onStart.bind(this), false);
        this.resetBtn.addEventListener('click', this.onReset.bind(this), false);
        this.continueBtn.addEventListener('click', this.hide.bind(this), false);

    }

    onReset() {
        this.hide();
        this.reset();
        this.start();
    }

    onStart() {
        this.hide();

        if (this.isStarted) {
            this.restart();
            return;
        }

        this.start();
        this.appStarted();
    }

    appStarted() {

        this.isStarted = true;
        // this.startBtn.style.display = 'none';
        // this.resetBtn.style.display = 'block';
        // this.continueBtn.style.display = 'block';
    }

}