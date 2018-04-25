import { Question } from './question';
import { Fact } from './fact';
import { Widget } from './widget';
import { Navigation } from './navigation';
import { Location } from './location';
import { AppData } from './app-data';

import { StartPage } from './start-page';
import { SummaryPage } from './summary-page';

export class App {

    currPage = null;

    constructor(container) {

        this.container = container;

        page('*', this.routeChange);
        page({ hashbang: true });

        // Setup allow routes
        // page('/audit/:q', this.updateWidget.bind(this));
        // page('/audit/*', this.updateWidget.bind(this));
        // page('/home', this.setupHome.bind(this));
        // page('/summary', this.setupSummary.bind(this));
        // page('/', this.setupHome.bind(this));
        // page('*', this.setupHome.bind(this));
        // page({ hashbang: true });
    }

    routeChange(event) {

        var path = event.path;
        var params = event.params;        

        // 
        console.log('path: ', path, ' params: ', params);
    }

    setupHome() {
        // If back state from summary
        if (this.summaryPage.htmlElement) {
            this.summaryPage.hide();
        }

        this.location.updateView('generic');
        this.startPage.show();
    }

    setupSummary() {

        if (!this.widget) {
            this.startWidget();
            return;
        }

        var summaryData = this.appData.getSummaryData();

        if (!summaryData) {
            this.setupHome();
            return;
        }

        this.location.updateView('generic');
        this.startPage.hide();
        this.summaryPage.show(summaryData);
    }

    updateWidget(event) {
        var path = event.path;
        var params = event.params;

        // user attempting to load widget route
        if (!this.widget && params.q) {
            this.reload(params.q);
            return;
        }

        // If back state from summary
        if (this.summaryPage.htmlElement) {
            this.summaryPage.hide();
        }

        var questionId = params.q;
        var locationId = this.appData.getLocationId(questionId);

        this.startPage.hide();
        this.location.updateView(locationId);
        this.widget.updateView(questionId);

    }

    navigateTo(route) {
        // All route changes are handled here
        page(route);
    }



}
