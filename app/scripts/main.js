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

    // Add menu
    var body = document.querySelector('body');
    var hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {

        if (body.classList.contains('menu-open')) {
            body.classList.remove('menu-open');
        } else {
            body.classList.add('menu-open');
        }
    });

}
