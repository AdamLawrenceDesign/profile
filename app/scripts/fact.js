import { StateManager } from './state-manager';

export class Fact {

    constructor(container, navigateTo) {
        this.fact = null;
        this.container = container;
        this.navigateTo = navigateTo;

        // Subscribers 
        this.listeners = {};

        this.stateManager = new StateManager(this.container);
    }

    showFact(fact) {

        // Retrive new value from button
        var context = {
            text: fact
        }

        // hopefully add next functionallity
        var source = document.getElementById('template__fact');
        var template = Handlebars.compile(source.innerHTML);
        var result = template(context);
        this.container.insertAdjacentHTML('afterbegin', result);

        this.stateManager.enterChildrenAfter('.fact__wrapper');
        this.addListeners();

        this.previouslyViewed = true;

    }

    addListeners() {

        this.nextBtn = this.container.querySelector('.fact__next-btn');

        this.nextBtn.addEventListener('click', this.next.bind(this), false);

        this.background = this.container.querySelector('.fact__background');
        this.background.addEventListener('click', (event) => {
            this.stateManager.leave('.fact__wrapper', this.destroyFact.bind(this), 200);
        });

        this.closeBtn = this.container.querySelector('.fact__close-btn');
        this.closeBtn.addEventListener('click', (event) => {
            this.stateManager.leave('.fact__wrapper', this.destroyFact.bind(this), 200);
        });

    }

    next(event) {
        this.stateManager.leave('.fact__wrapper', () => {
            this.destroyFact();
            this.navigateTo('next');
        }, 200);
    }

    destroyFact() {
        // TODO remove event listeners 
        // save memory problems
        // Remove fact from dom
        var factBackground = this.container.querySelector('.fact__background');
        var factWrapper = this.container.querySelector('.fact__wrapper');
        this.container.removeChild(factBackground);
        this.container.removeChild(factWrapper);

        this.navigateTo('void');

    }


}
