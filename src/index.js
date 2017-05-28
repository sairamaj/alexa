'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = "amzn1.echo-sdk-ams.app.[amzn1.ask.skill.7b21ed76-1c8d-483b-ac6f-899fd16469df]";
var SKILL_NAME = 'Tech Smart';

var states = {
    LEARNINGMODE: '_LEARNINGMODE', // User is trying to learn the design patterns
    POKINGMODE: '_POKINGMODE'  // User is trying to find out specific pattern mode.
};

var DesignPatternSummary =
    '<emphasis level="moderate">Creational Patterns </emphasis>, Abstract Factory, Builder, Factory Method,Prototype, Singleton. '
/*    
var DesignPatternSummary = 
    '<emphasis level="moderate">Creational Patterns </emphasis>, Abstract Factory, Builder, Factory Method,Prototype, Singleton. ' +
    '<break time="1s"/><emphasis level="moderate"></emphasis> Structural Patterns, Adapter, Bridge , Composite, Decorator, Facade, Flyweight, Proxy. ' +
    '<break time="1s"/><emphasis level="moderate">Behavioral Patterns</emphasis>, Chain of Responsibility, Command, Interpreter, Iterator, Mediator, Memento, Observer, State, Strategy, Template Method, Visitor.'
*/
var AskUserForSpecificPattern = "You can ask for specific pattern. For example tell me about Builder pattern."

var patternsInfo = {}
patternsInfo['singleton'] = 'This is singleton pattern'
patternsInfo['builder'] = 'Builder pattern will be here'
patternsInfo['adapter'] = 'Adapter will be explained here'
patternsInfo['iterator'] = 'Iterator pattern is coming up.'

var learningPatternsInfo = []
learningPatternsInfo[0] = { name: "singleton", description: 'This is singleton pattern' }
learningPatternsInfo[1] = { name: "builder", description: 'This is builder pattern' }
learningPatternsInfo[2] = { name: "adapter", description: 'This is adapter pattern' }
learningPatternsInfo[3] = { name: "iterator", description: 'This is iterator pattern' }

patternsInfo['singleton'] = 'This is singleton pattern'
patternsInfo['builder'] = 'Builder pattern will be here'
patternsInfo['adapter'] = 'Adapter will be explained here'
patternsInfo['iterator'] = 'Iterator pattern is coming up.'

function getNextPattern(currentPattern) {
    var i = 0
    var index = learningPatternsInfo.find(function (p) {
        if (p.name === currentPattern) {
            return true
        }
        i++
    })
    if (i == learningPatternsInfo.length) {
        return learningPatternsInfo[0]
    }
    return learningPatternsInfo[i + 1]
}
exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(learningModeHandlers, handlers);
    alexa.execute();
};

var learningModeHandlers = Alexa.CreateStateHandler(states.LEARNINGMODE, {
    'DesignPatternLearningIntent': function () {
        console.log("In LEARNINGMODE.DesignPatternLearningIntent")
        console.log("handler state is: " + JSON.stringify(this.handler.state))
        var nextPattern = getNextPattern(this.attributes['currentpattern'])
        var speechOutput = nextPattern.description + '. You want to me to continue yes or no'
        this.attributes['currentpattern'] = nextPattern.name
        this.handler.state = states.LEARNINGMODE
        this.emit(':ask', speechOutput, SKILL_NAME, speechOutput)
    },

    'AMAZON.NoIntent': function () {
        this.handler.state = ""
        this.emit(':tell', 'Ok, see you next time!');
    },

    "AMAZON.StopIntent": function () {
        console.log("STOPINTENT");
        this.handler.state = ""
        this.emit(':tell', "Goodbye!");
    },
    "AMAZON.CancelIntent": function () {
        console.log("CANCELINTENT");
    },
    'AMAZON.HelpIntent': function () {
        var message = 'Last time you have. You want to me to continue?';
        this.emit(':ask', message, message);
    },
    'AMAZON.YesIntent': function () {
        console.log("In LEARNINGMODE.YesIntent")
        console.log("handler state is: " + JSON.stringify(this.handler.state))
        var nextPattern = getNextPattern(this.attributes['currentpattern'])
        var speechOutput = nextPattern.description + '. You want to me to continue yes or no'
        this.attributes['currentpattern'] = nextPattern.name
        this.handler.state = states.LEARNINGMODE
        this.emit(':ask', speechOutput, SKILL_NAME, speechOutput)
        },
    'SessionEndedRequest': function () {
        console.log('session ended!');
        this.attributes['endedSessionCount'] += 1;
        this.emit(':saveState', true);
    },
    'Unhandled': function () {
        var message = 'Say yes to continue, or no to end.';
        this.emit(':ask', message, message);
    }
})

var handlers = {
    'LaunchRequest': function () {
        this.emit('DesignPatternSummary');
    },
    'DesignPatternSummaryIntent': function () {
        this.emit('DesignPatternSummary');
    },

    'DesignPatternLearningIntent': function () {
        this.emit('DesignPatternLearning')
    },
    'DesignPatternIntent': function () {
        this.emit('DesignPatternInfo')
    },
    'DesignPatternSummary': function () {
        var speechOutput = DesignPatternSummary + AskUserForSpecificPattern
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, speechOutput)
    },
    'DesignPatternInfo': function () {
        var patternName = this.event.request.intent.slots.name.value
        var speechOutput
        if (patternName === undefined) {
            this.emit(':tellWithCard', 'please specify patter name', SKILL_NAME, 'please specify patter name')
            return
        }

        patternName = patternName.toLowerCase()
        if (patternsInfo[patternName] === undefined) {
            speechOutput = patternName + ' is not supported'
        } else {
            speechOutput = patternsInfo[patternName]
        }
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, speechOutput)
    },
    'DesignPatternLearning': function () {
        console.log("handler state is: " + JSON.stringify(this.handler.state))
        var speechOutput = 'will start with singleton. Singleton pattern is one instance. You want to me to continue yes or no'
        this.handler.state = states.LEARNINGMODE
        this.attributes['currentpattern'] = 'singleton'
        this.emit(':ask', speechOutput, SKILL_NAME, speechOutput)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say give me last design pattern, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }

};