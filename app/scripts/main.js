import { App } from './app';


const appData = {
    version: '0.0.1',
    questions: [
        {
            id: 'choice0', identifier: 'choice0', type: 'SingleChoice', question: 'Do you or any member of your household light candles or burn incense in a bedroom?', location: 'Bedroom', answers: [
                { answer: 'Yes', fact: null, weight: 7, id: '124124' },
                { answer: 'No', fact: null, weight: 0, id: '1221244' }
            ]
        },
        {
            id: 'choice1', identifier: 'choice1', type: 'SingleChoice', question: 'Do you or any members of your household smoke in a bedroom?', location: 'Bedroom', answers: [
                { answer: 'Yes', fact: 'factId0', weight: 7, id: '1247u134' },
                { answer: 'No', fact: null, weight: 0, id: '122121242144' },
                { answer: 'No Smokers in the house', fact: null, weight: 0, id: '1247214' },
            ]
        },
        {
            id: 'choice2', identifier: 'choice2', type: 'MultiChoice', question: 'Do you or any member of your household use any of the following equipment in the bedroom?', location: 'Bedroom', answers: [
                { answer: 'Heaters', fact: null, weight: 1, id: 'PO214124' },
                { answer: 'Electric Blankets', fact: 'factId1', weight: 1, id: 'HJDHJD341' },
                { answer: 'Powerboards', fact: null, weight: 1, id: '12421ASF4' },
                { answer: 'None of the above', fact: null, weight: 1, id: '12421ASF4' }
            ]
        },
        {
            id: 'multiChoice0', identifier: 'multiChoice0', type: 'MultiChoice', question: 'Which items are used for heating in your home?', location: 'LivingLoungeRoom', answers: [
                { answer: 'Bar heater', fact: null, weight: 1, id: '214125' },
                { answer: 'Gas heater', fact: null, weight: 1, id: '512521' },
                { answer: 'Wood fired heater', fact: null, weight: 1, id: '1254561' },
                { answer: 'Other', fact: 'factId2', weight: 0, id: '214214f4' },
                { answer: 'None of the above', fact: null, weight: 0, id: '124g15g1' }
            ]
        },
        {
            id: 'choice4', identifier: 'choice4', type: 'SingleChoice', question: 'Do you or any member of your household use the heater to dry your clothes?', location: 'LivingLoungeRoom', answers: [
                { answer: 'Yes', fact: null, weight: 5, id: 'asdfasdf32154' },
                { answer: 'No', fact: null, weight: 0, id: 'adsfa132412h' }
            ]
        },
        {
            id: 'choice5', identifier: 'choice5', type: 'SingleChoice', question: 'Do you or any member of your household smoke in the living room?', location: 'LivingLoungeRoom', answers: [
                { answer: 'Yes', fact: null, weight: 5, id: '707812jas1' },
                { answer: 'No', fact: null, weight: 0, id: 'ad781hnja' }
            ]
        }
        // Range not longer needed
        // {
        //     id: 'range0', type: 'range', question: '2. How many people live with you?', location: '1', answers: [
        //         { answer: 0, fact: null, weight: 1, id: '341244' },
        //         { answer: 1, fact: null, weight: 1, id: '65125314' },
        //         { answer: 2, fact: null, weight: 1, id: '6214154' },
        //         { answer: 3, fact: null, weight: 1, id: '12412556' },
        //         { answer: 4, fact: null, weight: 1, id: '12541451' },
        //         { answer: 5, fact: null, weight: 1, id: '151515' }
        //     ]
        // },
        // Replaced for now could be useful with
        // {
        //     id: 'bool0', identifier: 'bool0', type: 'bool', question: '3. Do you like where you live?', location: 'LivingLoungeRoom', answers: [
        //         { answer: 'Yes', fact: null, weight: 1, id: '124125' },
        //         { answer: 'No', fact: null, weight: 1, id: '1241244' }
        //     ]
        // },
    ],
    facts: [
        { id: 'factId0', text: 'Take extra care if smoking in the bedroom. People have died from falling asleep in bed with a lit cigarette.' },
        { id: 'factId1', text: 'Whats up? is another special fact!!' },
        { id: 'factId2', text: 'Never leave anything flammable such as curtains, clothing, bedding or children\'s toys within one metre of a heater.' }
    ]
}

document.addEventListener('readystatechange', bootstrap, false);

function bootstrap(event) {
    if (event.target.readyState === 'interactive' || event.target.readyState === 'complete') {
        init();
    }
}



function init(event) {
    var app = new App(document.getElementById('app'), appData);
}
