import { Answer } from './answer';

export class Question {

    constructor(data, state, container, value, valueChange, navigateTo) {
        this.data = data;
        this.state = state;
        this.container = container;
        this.htmlElement = null;

        // Value Changes 
        this.value = value;
        this.valueChange = valueChange;

        // Navigation Request
        this.navigateTo = navigateTo;

        // subscribers
        this.listeners = {};

        this.init();
    }

    init() {

        this.data.prevId = this.data.prev ? this.data.prev.id : null;
        this.data.nextId = this.data.next ? this.data.next.id : null;
        this.data.state = this.state;

        var newElement = this.createHtmlElement(this.data);

        this.container.insertAdjacentHTML('beforeend', newElement);
        this.htmlElement = this.container.querySelector('div[data-id="' + this.data.id + '"]');

        var addAnswer = new Answer(this.data, this.htmlElement, this.value, this.valueChange);

    }


    createHtmlElement(item) {

        var partialLookup = {
            'SingleChoice': 'template__choice',
            'bool': 'template__bool',
            'MultiChoice': 'template__multi-choice',
            'range': 'template__range',
            'Info': 'template__info'
        }

        var context = {
            order: item.order,
            state: item.state,
            type: item.type,
            question: item.question,
            location: item.location,
            next: item.nextId,
            prev: item.prevId,
            id: item.id,
            answers: item.answers,
            min: 0,
            max: (item.answers.length) ? item.answers.length - 1 : 0
        }

        var source = document.getElementById('template__question');
        var template = Handlebars.compile(source.innerHTML);
        Handlebars.registerPartial('questionWrap', document.getElementById(partialLookup[item.type]).innerHTML);
        var result = template(context);

        return result;
    }

    removeListeners() {
        for (var key in this.listeners) {
            this.listeners[key].removeEventListener('click', this.navigateTo, false);
        }
    }

}

