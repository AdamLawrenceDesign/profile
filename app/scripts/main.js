import { AnimationController } from './animation.controller';
import { App } from './app';

var app;

document.addEventListener('readystatechange', bootstrap, false);

function bootstrap(event) {
    if (event.target.readyState === 'interactive' || event.target.readyState === 'complete') {
        init();
    }
}

function init(event) {

    if (app) {
        return;
    }

    app = new App(document.querySelector('main'));
    var animationCtrl = new AnimationController();

    // Add menu
    var body = document.querySelector('body');
    var hamburger = document.querySelector('.hamburger');
    var backdrop = document.querySelector('.backdrop');
    var nav = document.querySelector('nav');

    animationCtrl.enter(nav);


    hamburger.addEventListener('click', () => {

        console.log('hamburger');

        if (body.classList.contains('menu-open')) {
            body.classList.remove('menu-open');
        } else {
            body.classList.add('menu-open');
        }
    });

    backdrop.addEventListener('click', () => {

        body.classList.remove('menu-open');
    });


}
