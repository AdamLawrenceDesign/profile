import { Question } from './question';
import { Fact } from './fact';
import { Widget } from './widget';
import { Navigation } from './navigation';
import { Location } from './location';
import { AppData } from './app-data';

import { StartPage } from './start-page';
import { SummaryPage } from './summary-page';

export class App {

    constructor(container, sampleData) {

        this.container = container;
        this.sampleData = sampleData;
        this.appData = new AppData();

        // Audit Value
        this.value = {};

        // Pages 
        this.startPage = new StartPage(this.container, this.startWidget.bind(this), this.restart.bind(this));
        this.summaryPage = new SummaryPage(this.container, this.restart.bind(this));

        // location Component
        this.location = new Location(this.container);
        this.location.addLocations(['generic']);

        // navigation
        this.navigation = new Navigation(this.container, this.navigateTo.bind(this));

        // Setup allow routes
        page('/audit/:q', this.updateWidget.bind(this));
        page('/audit/*', this.updateWidget.bind(this));
        page('/home', this.setupHome.bind(this));
        page('/summary', this.setupSummary.bind(this));
        page('/', this.setupHome.bind(this));
        page('*', this.setupHome.bind(this));
        page({ hashbang: true });

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

    setupWidget() {
        // Get questions and answers from AJAX call with correct language!
        var auditResults = null;
        this.appData.setup(this.sampleData.questions, this.sampleData.facts, auditResults);
        // update locations
        this.location.addLocations(this.appData.locations);
        // Update location needed for updating the view on route changes
        this.widget = new Widget(this.container, this.appData.questions, this.appData.auditValue, this.appData.factByAnswerIdLookup, this.navigateTo.bind(this), this.valueChange.bind(this));
    }

    startWidget() {
        this.setupWidget();

        // Go to first
        var firstQuestionId = this.appData.questions[0].id;
        this.location.updateView(this.appData.getLocationId(firstQuestionId));
        page('/audit/' + firstQuestionId);
    }

    reload(id) {
        // Change view state of start page
        this.startPage.appStarted();
        this.setupWidget();
        page('/audit/' + id);
    }

    restart(data) {

        this.appData.auditValue = {};

        if (!this.appData.questions.length) {
            this.startWidget();
            return;
        }

        if (this.widget) {
            this.widget.reset();
        }

        page('/audit/' + this.appData.questions[0].id);
    }

    navigateTo(route) {
        // All route changes are handled here
        page(route);
    }

    valueChange(questionId, value) {

        this.appData.updateValue(questionId, value);

        var locationId = this.appData.getLocationId(questionId);
        var locationRiskLevel = this.appData.getLocationScore(locationId);

        this.location.updateScore(locationRiskLevel);

    }

}
