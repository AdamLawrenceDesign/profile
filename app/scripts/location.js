import { StateManager } from './state-manager';

export class Location {

    constructor(container) {
        this.container = container;
        this.stateManager = new StateManager();

        this.iconLookup = {
            'HomeSafety': 'home-safety',
            'LivingLoungeRoom': 'lounge',
            'Kitchen': 'kitchen',
            'Bedroom': 'bedroom',
            'House': 'home'
        };

    }

    addLocations(locations) {

        for (var i = 0; i < locations.length; i++) {
            var location = locations[i];
            this.appendToDom(location);
            // Update HTML 5 variables
            // if single
            var index = locations.length === 1 ? -1 : i;
            this.updateElementData(location, index);
        }
    }

    appendToDom(id) {
        var source = document.getElementById('template__location');
        var template = Handlebars.compile(source.innerHTML);

        var icon = this.iconLookup[id];
        var iconUrl = icon ? 'img/icon__' + icon + '.svg' : null;

        var context = {
            id: 'location__' + id,
            iconUrl: iconUrl
        }

        this.container.insertAdjacentHTML('afterbegin', template(context));
    }

    updateElementData(id, index) {
        var element = document.getElementById('location__' + id);
        element.dataset.bgState = 'void';
        element.dataset.bgOrder = index;
    }

    updateView(id) {

        var activeElement = document.querySelector('div[data-bg-state="active"]');
        var targetElement = document.getElementById('location__' + id);

        if (activeElement === targetElement) {
            return;
        }

        if (!activeElement) {
            this.stateManager.enter(targetElement);
            targetElement.dataset.bgState = 'active';

            this.container.classList.add('location__wrapper--' + id);
            this.container.dataset.activeLocation = id;
            return;
        }

        // Add new class
        this.container.classList.add('location__wrapper--' + id);
        // Remove previous class
        var prevLocation = this.container.dataset.activeLocation;
        this.container.classList.remove('location__wrapper--' + prevLocation);
        this.container.dataset.activeLocation = id;

        this.stateManager.leave(activeElement);
        this.stateManager.enter(targetElement);

        activeElement.dataset.bgState = 'void';
        targetElement.dataset.bgState = 'active';

        return;


    }

    updateScore(amount) {

        var activeElement = document.querySelector('div[data-bg-state="active"]');
        var scoreHtml = activeElement.querySelector('.location__score');

        this.stateManager.leave(scoreHtml, () => {
            scoreHtml.innerHTML = amount;
            this.stateManager.enter(scoreHtml);
        });


    }


}