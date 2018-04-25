
import { AnimationController } from './animation.controller';

export class App {

    constructor(container) {

        this.container = container;
        this.currElement = null;
        this.currId = null;
        this.animate = new AnimationController(container);

        page('/about', this.about.bind(this));
        page('/', this.home.bind(this));
        page('*', this.routeChange);
        page({ hashbang: true });

        // Setup allow routes
        // page('/audit/:q', this.updateWidget.bind(this));
    }

    routeChange(event) {

        var path = event.path;
        var params = event.params;        

        console.log('path: ', path, ' params: ', params);
    }

    about() {

        if (this.currId === 'about') {
            return;
        }

        console.log('show about');
        var source = document.getElementById('template__page');
        var template = Handlebars.compile(source.innerHTML);

        var context = {
            title: 'About',
            id: 'about'
        }

        this.container.insertAdjacentHTML('beforeend', template(context));
        
        var htmlElement = document.getElementById('about');

        console.log('elemtn', this.currElement);

        if (this.currElement) {
            this.animate.leave(this.currElement);
        }
        
        this.animate.enter(htmlElement);

        this.currId = 'about';
        this.currElement = htmlElement;

    }

    home() {

        if (this.currId === 'home') {
            return;
        }

        if (this.currElement) {
            this.animate.leave(this.currElement);
        }

        var source = document.getElementById('template__page');
        var template = Handlebars.compile(source.innerHTML);

        var context = {
            title: 'Home',
            id: 'home'
        }

        this.container.insertAdjacentHTML('beforeend', template(context));

        var htmlElement = document.getElementById('home');
        this.animate.enter(htmlElement);

        this.currId = 'home';
        this.currElement = htmlElement;

    }



    removePage(page) {
        this.animate.leave(page);
    }

}
