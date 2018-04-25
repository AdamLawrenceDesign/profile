import { App } from './app';


document.addEventListener('readystatechange', bootstrap, false);

function bootstrap(event) {
    if (event.target.readyState === 'interactive' || event.target.readyState === 'complete') {
        init();
    }
}

function init(event) {
    var app = new App(document.getElementById('app'));
}
