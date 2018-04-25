
import { AnimationController } from './animation.controller';

export class App {

    constructor(container) {

        console.log('container', container);

        this.container = container;
        this.currPage = null;
        this.animate = new AnimationController(container);

        page('/about', this.about.bind(this));
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

        console.log('show about');
        var source = document.getElementById('about');
        var template = Handlebars.compile(source.innerHTML);

        var context = {
            title: 'About'
        }


        this.container.insertAdjacentHTML('beforeend', template(context));

        this.animate.enter(document.getElementById('about__wrap'));

        this.currPage = document.getElementById('about__wrap');

    }


    removePage(page) {
        this.animate.leave(page);
    }

}
