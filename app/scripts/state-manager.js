

export class AnimationController {

    constructor(container) {
        this.container = container ? container : document;
        this.animationNames = ['ani__pop', 'ani__rotate', 'ani__slide-down', 'ani__fade', 'ani__slide-left', 'ani__slide-right', 'ani__slide'];
        this.modifiers = ['right', 'left'];
    }

    enter(element, callback, timing) {

        // Accepts query selector and element
        if (typeof element === 'string') {
            element = this.container.querySelector(element);
        }

        var animationName = this.getAnimationName(element.className);

        element.classList.remove(animationName + '--leave');
        element.classList.add(animationName + '--enter');
        element.classList.remove(animationName + '--active');

        if (!callback) {
            return;
        }

        setTimeout(() => {
            callback();
        }, !!timing ? timing : 500);

    }

    enterWithModifier(element, modifier) {
        // Accepts query selector and element
        if (typeof element === 'string') {
            element = this.container.querySelector(element);
        }

        var animationName = this.getAnimationName(element.className);

        for (var i = 0; i < this.modifiers.length; i++) {
            var modifierTemp = this.modifiers[i];
            element.classList.remove(animationName + '--leave-' + modifierTemp);
        }

        element.classList.add(animationName + '--enter-' + modifier);

    }

    leaveWithModifier(element, modifier) {
        // Accepts query selector and element
        if (typeof element === 'string') {
            element = this.container.querySelector(element);
        }

        var animationName = this.getAnimationName(element.className);

        for (var i = 0; i < this.modifiers.length; i++) {
            var modifierTemp = this.modifiers[i];
            element.classList.remove(animationName + '--enter-' + modifierTemp);
        }

        element.classList.add(animationName + '--leave-' + modifier);

    }

    enterWithModifierAnimateChildren(element, modifier) {
        this.enterWithModifier(element, modifier);

        setTimeout(() => {
            this.enterChildren(element);
        }, 500);

    }

    leaveWithModifierAnimateChildren(element, modifier) {
        this.leaveWithModifier(element, modifier);

        setTimeout(() => {
            this.leaveChildren(element);
        }, 500);
    }


    leave(element, callback, timing) {
        // Accepts query selector and element
        if (typeof element === 'string') {
            element = this.container.querySelector(element);
        }

        var animationName = this.getAnimationName(element.className);

        element.classList.remove(animationName + '--enter');
        element.classList.add(animationName + '--leave');

        if (!callback) {
            return;
        }

        setTimeout(() => {
            callback();
        }, !!timing ? timing : 500);

    }

    enterChildrenAfter(element) {
        this.enter(element);
        setTimeout(() => {
            this.enterChildren(element);
        }, 500)
    }

    leaveChildrenAfter(element) {
        this.leave(element);
        setTimeout(() => {
            this.leaveChildren(element);
        }, 500)
    }

    enterChildren(element) {

        if (typeof element === 'string') {
            element = this.container.querySelector(element);
        }

        var animationElements = [];


        for (var i = 0; i < this.animationNames.length; i++) {
            var name = this.animationNames[i];
            var childElements = element.querySelectorAll('.' + name);

            if (childElements && childElements.length) {

                for (var j = 0; j < childElements.length; j++) {
                    var childElement = childElements[j];

                    // TODO improve by adding order element 
                    // eg: dataset.animationOrder then order elements before displaying them
                    if (childElement.dataset.animationDelay) {
                        animationElements.push(childElement);
                    } else {
                        this.enter(childElement);
                    }

                }
            }

        }

        this.enterEachWithDelay(animationElements);

    }

    enterEachWithDelay(elements) {
        var delay = 0;


        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            delay += element.dataset.animationDelay ? +element.dataset.animationDelay : 0;

            this.enterWithDelay(element, delay);

        }

    }

    enterWithDelay(element, delay) {
        setTimeout(() => {
            this.enter(element);
        }, delay);
    }

    leaveChildren(element) {

        if (typeof element === 'string') {
            element = this.container.querySelector(element);
        }

        for (var i = 0; i < this.animationNames.length; i++) {
            var name = this.animationNames[i];
            var elements = element.querySelectorAll('.' + name);

            if (elements && elements.length) {
                for (var j = 0; j < elements.length; j++) {
                    var item = elements[j];
                    this.leave(item);
                }
            }

        }

    }

    enterQuerySelectorAs(name) {
        var element = this.container.querySelector(name);
        this.enter.leave(element);
    }

    getAnimationName(className) {
        for (var i = 0; i < this.animationNames.length; i++) {
            var animationName = this.animationNames[i];

            if (className.indexOf(animationName) >= 0) {
                return animationName;
            }
        }
    }

}

