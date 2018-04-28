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
}
