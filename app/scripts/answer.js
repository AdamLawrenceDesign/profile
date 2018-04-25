
export class Answer {

    constructor(question, container, value, valueChange) {
        this.question = question;
        this.container = container;
        this.value = value;
        this.valueChange = valueChange;

        this.init();
    }

    init() {
        // TODO: clean up
        if (this.question.type === 'MultiChoice') {
            this.addMultiChoiceListeners();
            return;
        }

        if (this.question.type === 'bool') {
            this.addBoolListeners();
            return;
        }

        if (this.question.type === 'SingleChoice') {
            this.addChoiceListeners();
            return;
        }

        if (this.question.type === 'range') {
            this.addRangeListeners();
        }

    }

    addRangeListeners() {
        var element = this.container.querySelector('input');

        this.addEventHandler(element, 'change', (event) => {
            this.updateRangeValue(event.target.value);
        });

        if (!this.question.answers.length) {
            console.warn('No answers available');
            return;
        }

        // Set value
        if (!this.value) {
            this.value = this.question.answers[0].id;
            element.value = this.question.answers[0].answer;
            this.updateRangeValue(this.question.answers[0].answer);
            return;
        }

        var answer = this.question.answers.find(item => {
            return item.id === this.value;
        });

        element.value = answer.answer;
        this.updateRangeValue(answer.answer);

    }

    addEventHandler(elem, eventType, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(eventType, handler, false);
        } else if (elem.attachEvent) {
            elem.attachEvent('on' + eventType, handler);
        }
    }

    updateRangeValue(value) {

        var answer = this.question.answers.find(item => {
            return +item.answer === +value;
        });


        var element = document.querySelector('.range__display');
        element.innerText = answer.answer;
        this.valueChange(this.question.id, answer.id);

    }

    addBoolListeners() {

        var elements = this.container.querySelectorAll('li[data-answer-id]')

        if (!elements && !elements.length) {
            return;
        }

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            if (this.value && this.value.length) {
                if (this.value.indexOf(element.dataset.answerId) >= 0) {
                    element.classList.add('bool__answer--active');
                    this.updateBoolValue(elements, element.dataset.answerId);
                }
            }

            element.addEventListener('click', (event) => {
                event.target.classList.toggle('bool__answer--active');
                this.updateBoolValue(elements, event.target.dataset.answerId);
            });

        }

    }

    updateBoolValue(elements, id) {

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var checkbox = element.querySelector('input');

            if (element.dataset.answerId === id) {
                element.classList.add('bool__answer--active');
                checkbox.checked = true;
            } else {
                element.classList.remove('bool__answer--active');
                checkbox.checked = false;
            }

        }

        this.valueChange(this.question.id, id);

    }

    addMultiChoiceListeners() {

        var elements = this.container.querySelectorAll('li[data-answer-id]')

        if (!elements && !elements.length) {
            return;
        }

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            if (this.value && this.value.length) {
                if (this.value.indexOf(element.dataset.answerId) >= 0) {
                    element.classList.add('multi-choice__answer--active');
                }
            }

            element.addEventListener('click', (event) => {
                event.target.classList.toggle('multi-choice__answer--active');
                this.updateMultiChoiceValue();
            });

        }

    }

    updateMultiChoiceValue() {

        var value = null;
        var selectedItems = this.container.querySelectorAll('.multi-choice__answer--active');

        this.resetValues();

        if (selectedItems && selectedItems.length) {
            value = [];

            for (var i = 0; i < selectedItems.length; i++) {
                var item = selectedItems[i];
                var inputElement = item.querySelector('input');
                inputElement.checked = true;

                value.push(item.dataset.answerId);

            }
        }

        this.valueChange(this.question.id, value);
    }

    addChoiceListeners() {

        var elements = this.container.querySelectorAll('li[data-answer-id]')

        if (!elements && !elements.length) {
            return;
        }

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            if (this.value && this.value.length) {
                if (this.value.indexOf(element.dataset.answerId) >= 0) {
                    element.classList.add('choice__answer--active');
                    this.updateChoiceValue(elements, element.dataset.answerId);
                }
            }

            element.addEventListener('click', (event) => {
                event.target.classList.toggle('choice__answer--active');
                this.updateChoiceValue(elements, event.target.dataset.answerId);
            });

        }

    }

    updateChoiceValue(elements, id) {

        console.log('elements', id);
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var checkbox = element.querySelector('input');

            console.log('dataset', element.dataset.answerId);

            if (element.dataset.answerId === id) {
                console.log('set to true');
                element.classList.add('choice__answer--active');
                checkbox.checked = true;
            } else {
                element.classList.remove('choice__answer--active');
                checkbox.checked = false;
            }

        }

        this.valueChange(this.question.id, id);

    }

    resetValues() {
        var inputElements = this.container.querySelectorAll('input');

        for (var i = 0; i < inputElements.length; i++) {
            var input = inputElements[i];
            input.checked = false;
        }

    }


}