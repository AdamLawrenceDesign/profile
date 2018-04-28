
import { AnimationController } from './animation.controller';
import { routes } from './routes';
import { ENGINE_METHOD_PKEY_ASN1_METHS } from 'constants';

export class App {

    constructor(container) {

        console.log('routes', routes);

        this.container = container;
        this.currPage = null;
        this.animate = new AnimationController(container);

        page('/resume', this.resume.bind(this));
        page('/work', this.work.bind(this));
        page('/about/:q', this.about.bind(this));
        page('/about', this.about.bind(this));
        page('/', this.home.bind(this));
        page('*', this.home.bind(this));
        page({ hashbang: true });
    }

    resume(event) {
        console.log('resume', event);
        this.routeChange('resume');
    }

    work(event) {
        console.log('work', event);
        this.routeChange('work');

    }

    about(event) {
        console.log('about', event);
        this.routeChange('about');

    }

    home(event) {
        console.log('home', event);
        this.routeChange('home');
    }

    routeChange(name) {

        if (name === this.currPage) {
            return;
        }

        // Remove page
        var enterDirection = this.getEnterDirection(this.currPage, name);
        var leaveDirection = this.getLeaveDirection(this.currPage, name);

        if (!this.currPage) {
            this.pageEnter(name, enterDirection);
            return;
        }

        var htmlElement = this.container.querySelector('#' + this.currPage);

        this.animate.leave(htmlElement, () => {

            this.container.removeChild(htmlElement);
            this.pageEnter(name, enterDirection);
        });
    }

    pageEnter(name, direction) {

        var source = document.getElementById('template__page').innerHTML;
        var template = Handlebars.compile(source);

        this.container.insertAdjacentHTML('beforeend', template({name: name}));
        this.animate.enter( document.getElementById(name));
        this.currPage = name;
    }

    getEnterDirection(curr, next) {
        return 'right';
    }

    getLeaveDirection(curr, next) {
        return 'left';
    }

    // routeChange(event) {

    //     var path = event.path;
    //     var params = event.params;        

    //     console.log('event: ', event, ' params: ', params);
    // }

    // about() {

    //     if (this.currId === 'about') {
    //         return;
    //     }

    //     console.log('show about');
    //     var source = document.getElementById('template__page');
    //     var template = Handlebars.compile(source.innerHTML);

    //     var context = {
    //         title: 'About',
    //     }

    //     this.container.insertAdjacentHTML('beforeend', template(context));
        
    //     var htmlElement = document.getElementById('about');

    //     console.log('elemtn', this.currElement);

    //     if (this.currElement) {
    //         this.animate.leave(this.currElement);
    //     }

    //     this.animate.enter(htmlElement);

    //     this.currId = 'about';
    //     this.currElement = htmlElement;

    // }

    // home() {

    //     if (this.currId === 'home') {
    //         return;
    //     }

    //     if (this.currElement) {
    //         this.animate.leave(this.currElement);
    //     }

    //     var source = document.getElementById('template__page');
    //     var template = Handlebars.compile(source.innerHTML);

    //     var context = {
    //         title: 'Home',
    //         id: 'home'
    //     }

    //     this.container.insertAdjacentHTML('beforeend', template(context));

    //     var htmlElement = document.getElementById('home');
    //     this.animate.enter(htmlElement);

    //     this.currId = 'home';
    //     this.currElement = htmlElement;

    // }



    removePage(page) {
        this.animate.leave(page);
    }

}
