'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = "amzn1.echo-sdk-ams.app.[amzn1.ask.skill.7b21ed76-1c8d-483b-ac6f-899fd16469df]";
var SKILL_NAME = 'Tech Smart';

/**
 * Array containing US capital facts.
 */
var DesignPatternInfo = [
    "Singleton is creational pattern, ensures a class has only one instance",
    "Factory is creational pattern, Creation should be separated from representation of an object",
    "Observer is behavior pattern, Adopt the principle of Separation of Concerns"
];

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetDesignPattern');
    },
    'DesignPatternIntent': function () {
        this.emit('GetDesignPattern');
    },
    'GetDesignPattern': function () {
        var speechOutput
        var patternName = this.event.request.intent.slots.name.value
        if (patternName == null) {
            var factIndex = Math.floor(Math.random() * DesignPatternInfo.length);
            var randomFact = DesignPatternInfo[factIndex];
            // Create speech output
            speechOutput = randomFact;
        }else{
            speechOutput = "pattern will be " + patternName
        }
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
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