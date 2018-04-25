
export class AppData {

    constructor() {
        // AppData
        this.questions = [];
        this.facts = [];
        this.locations = [];
        this.auditValues = [];

        // Get question by id
        this.questionLookup = {};
        // Get Answer by answer id
        this.answerLookup = {};
        // Key value pair of fact ids and values
        this.factLookup = {};
        // Get fact by answer id
        this.factByAnswerIdLookup = {};

        // Hard coded look up
        this.locationNameLookup = {
            Bedroom: 'Bedroom',
            LivingLoungeRoom: 'Lounge & Living Room',
        }

        this.iconLookup = {
            'LivingLoungeRoom': 'lounge',
            'Bedroom': 'bedroom'
        };

    }

    setup(questions, facts, auditValues) {
        this.resetValues();

        this.questions = questions;
        this.facts = facts;
        this.locations = this.getLocations(questions);

        // Array of old audit values
        this.auditValues = !!auditValues ? auditValues : [];
        // Current Audit value
        this.auditValue = {};

        this.factLookup = this.getGenericLookup(facts, 'id', 'text');
        this.factByAnswerIdLookup = this.getFactByAnswerIdLookup(questions, this.factLookup);

        this.answerLookup = this.getAnswerLookup(questions);

        this.questionLookup = this.getGenericLookup(questions, 'id');

        this.locationByQuestionIdLookup = this.getGenericLookup(questions, 'id', 'location');

    }

    getGenericLookup(arr, key, value) {
        var obj = {};

        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];

            if (value) {
                obj[item[key]] = item[value];
            } else {
                obj[item[key]] = item;
            }

        }

        return obj;

    }

    getFactByAnswerIdLookup(questions, factLookup) {
        var obj = {};

        for (var i = 0; i < questions.length; i++) {
            var answers = questions[i].answers;

            for (var j = 0; j < answers.length; j++) {
                var answer = answers[j];

                if (answer.fact) {
                    obj[answer.id] = factLookup[answer.fact];
                }

            }
        }

        return obj;

    }

    getAnswerLookup(questions) {
        var obj = {};

        for (var i = 0; i < questions.length; i++) {
            var question = questions[i];
            var location = question.location;

            for (var j = 0; j < question.answers.length; j++) {
                var answer = question.answers[j];
                var id = '' + answer.id;
                obj[id] = answer;
            }

        }

        return obj;

    }

    getLocations(questions) {

        var locations = [];

        for (var i = 0; i < questions.length; i++) {
            var location = questions[i].location;
            if (locations.indexOf(location) === -1) {
                locations.push(location);
            }
        }

        return locations;

    }

    getEmptyLocationResults(locations, value) {
        var obj = {};

        for (var i = 0; i < locations.length; i++) {
            var location = locations[i];
            obj[location] = {};
        }

        return obj;

    }

    resetValues() {
        this.question = [];
        this.facts = [];
        this.locations = [];

        this.auditValue = {};

        this.questionLookup = {};
        this.answerLookup = {};
        this.factLookup = {};
        this.answerFactLookup = {};
        this.locationByQuestionIdLookup = {};
        this.locations = [];
    }

    // --------------------------------
    // Results 
    // --------------------------------

    updateValue(questionId, value) {
        this.auditValue[questionId] = value;
    }

    getLocationId(questionId) {
        var locationByQuestionIdLookup = this.getGenericLookup(this.questions, 'id', 'location');
        return locationByQuestionIdLookup[questionId];
    }

    getAnswerWeight(answerId) {
        return this.answerLookup[answerId].weight;
    }

    getLocationScore(locationId) {
        var total = 0;

        for (var questionId in this.auditValue) {
            // Answers can be an array or an single string
            var answerId = (typeof this.auditValue[questionId] === 'string') ? this.auditValue[questionId] : null;
            var answerIds = (Array.isArray(this.auditValue[questionId])) ? this.auditValue[questionId] : null;
            var questionLocationId = this.getLocationId(questionId);

            // Compare locations 
            if (locationId === questionLocationId) {

                if (answerId) {
                    total += this.getAnswerWeight(answerId);
                }

                if (answerIds) {
                    for (var i = 0; i < answerIds.length; i++) {
                        var nestedAnswerId = answerIds[i];
                        total += this.getAnswerWeight(nestedAnswerId);
                    }
                }

            }

        }

        return total;
    }

    getTotalScore() {
        var score = 0;

        for (var i = 0; i < this.locations.length; i++) {
            var locationId = this.locations[i];
            score += this.getLocationScore(locationId);
        }

        return score;
    }

    getSummaryData() {

        if (!this.questions) {
            return null;
        }

        var locationSummaries = [];

        for (var i = 0; i < this.locations.length; i++) {
            var locationId = this.locations[i];

            locationSummaries.push({
                name: this.locationNameLookup[locationId],
                id: locationId,
                iconUrl: 'img/icon__' + this.iconLookup[locationId] + '.svg',
                score: this.getLocationScore(locationId)
            });

        }

        return {
            total: this.getTotalScore(),
            locations: locationSummaries
        };

    }

}
