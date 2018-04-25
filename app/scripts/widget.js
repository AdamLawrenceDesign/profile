import { Fact } from './fact';
import { Question } from './question';
import { StateManager } from './state-manager';

export class Widget {

    constructor(appContainer, questions, value, factLookup, navigateTo, valueChange) {
        this.appContainer = appContainer;
        this.questions = questions;
        this.value = value;
        this.navigateTo = navigateTo;
        this.valueChange = valueChange;

        this.stateManager = new StateManager(this.appContainer);

        // Append all content besides facts to widget container
        this.container = document.getElementById('widget');

        this.factLookup = factLookup;
        this.fact = new Fact(this.appContainer, this.requestRouteChange.bind(this));

        this.currRoute;

        this.active = null;
        this.prev = null;
        this.next = null;

        // Viewed facts
        this.viewedFacts = {};

        this.addNavigation();

    }

    addNavigation() {
        // subscribers
        this.listeners = {};

        this.nextBtn = this.container.querySelector('.link__next');
        this.prevBtn = this.container.querySelector('.link__prev');

        this.listeners.next = this.nextBtn;
        this.nextBtn.addEventListener('click', this.navigateNext.bind(this), false);

        this.listeners.back = this.prevBtn;
        this.prevBtn.addEventListener('click', this.navigatePrev.bind(this), false);

    }

    navigateNext(event) {
        this.requestRouteChange('next');
    }

    navigatePrev(event) {
        this.requestRouteChange('prev');
    }

    updateView(id) {

        var questionData = this.getQuestionData(id);

        if (!questionData) {
            return;
        }

        this.updateViewState(questionData);

        if (!this.prev) {
            this.stateManager.leave(this.prevBtn);
        } else {
            this.stateManager.enter(this.prevBtn);
        }

        if (this.next) {
            this.stateManager.enter(this.nextBtn);
        }


    }

    getQuestionData(id) {

        var response;
        var index = this.questions.findIndex((item) => {
            return item.id === id;
        })

        if (index === -1) {
            return null;
        }

        response = this.questions[index];
        response.order = index;

        // Attach Previous and Next questions
        response.prev = this.questions[index - 1] ? this.questions[index - 1] : null;
        response.next = this.questions[index + 1] ? this.questions[index + 1] : null;

        if (response.prev) {
            response.prev.order = index - 1;
        }

        if (response.next) {
            response.next.order = index + 1;
        }

        return response;

    }

    updateViewState(questionData) {
        // Current View State 
        var activeElement = this.container.querySelector('div[data-state="active"]');

        if (!activeElement) {
            this.setupNewView(questionData);
            return;
        }

        // If is next in sequence
        if (+activeElement.dataset.order + 1 === +questionData.order) {
            this.loadNext(questionData.next);
            return;
        }

        if (+activeElement.dataset.order - 1 === +questionData.order) {
            this.loadPrev(questionData.prev);
            return;
        }

    }

    setupNewView(questionData) {

        if (questionData.prev) {
            this.addQuestion('prev', questionData.prev.id);
        }

        if (questionData.next) {
            this.addQuestion('next', questionData.next.id);
        }

        this.addQuestion('active', questionData.id)
        this.stateManager.enterWithModifierAnimateChildren(this.active.htmlElement, 'right');

    }

    loadNext(data) {

        if (this.prev) {
            this.removeQuestion('prev');
        }

        this.prev = null;
        this.prev = this.active;
        this.prev.htmlElement.dataset.state = 'prev';
        this.stateManager.leaveWithModifierAnimateChildren(this.prev.htmlElement, 'left');

        this.active = null;
        this.active = this.next;
        this.active.htmlElement.dataset.state = 'active';
        this.stateManager.enterWithModifierAnimateChildren(this.active.htmlElement, 'right');

        if (!data) {
            this.next = null;
            return;
        }

        this.addQuestion('next', data.id);

    }

    loadPrev(data) {

        if (this.next) {
            this.removeQuestion('next');
        }

        this.next = null;
        this.next = this.active;
        this.next.htmlElement.dataset.state = 'next';
        this.stateManager.leaveWithModifierAnimateChildren(this.next.htmlElement, 'right');

        this.active = null;
        this.active = this.prev;
        this.active.htmlElement.dataset.state = 'active';
        this.stateManager.enterWithModifierAnimateChildren(this.active.htmlElement, 'left');

        if (!data) {
            this.prev = null;
            return;
        }

        this.addQuestion('prev', data.id);

    }

    removeQuestion(key) {

        if (!this[key] || !this[key].htmlElement) {
            return;
        }

        this[key].removeListeners();
        this.container.removeChild(this[key].htmlElement);
        this[key] = null;

    }

    addQuestion(key, id) {
        var data = this.getQuestionData(id);
        this[key] = this.createQuestion(data, key);
    }

    createQuestion(data, state) {
        var questionValue = (!!this.value[data.id]) ? this.value[data.id] : null;
        return new Question(data, state, this.container, questionValue, this.valueChange.bind(this), this.requestRouteChange.bind(this));
    }

    getElementById(item) {
        if (!item || !item.id) {
            return null;
        }
        return document.querySelector('div[data-id="' + item.id + '"]');
    }

    updateInnerHtml(element) {
        var icon = element.querySelector('.card__icon');
        var content = element.querySelector('.card__content');

        icon.classList.add('card__icon--active');
        content.classList.add('card__content--active');
    }

    requestRouteChange(action) {
        var routeName;
        var id = this.active.data.id;
        var value = this.value[id];
        var fact = (this.value[id] && this.factLookup[this.value[id]]) ? this.factLookup[this.value[id]] : null;
        var routeId;

        // Block Route change if fact needs to be viewed
        if (action === 'next' && fact && !this.viewedFacts[id]) {
            this.fact.showFact(fact);
            this.viewedFacts[id] = fact;
            return;
        }

        // Void states used on fact destroy
        if (action === 'void') {
            this.viewedFacts[id] = fact;
            return;
        }

        // Normal route states below

        if (action === 'next' && !this.next) {
            // Widget Finished!
            routeName = '/summary';
        }

        if (action === 'next' && this.next) {
            routeName = '/audit/' + this.next.data.id;
        }

        if (action === 'prev') {
            routeName = '/audit/' + this.prev.data.id;
        }

        this.navigateTo(routeName);

    }

    reset() {
        this.active = null;
        this.prev = null;
        this.next = null;

        var cards = this.container.querySelectorAll('.card');

        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            this.container.removeChild(card);
        }


    }

}