'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = "amzn1.echo-sdk-ams.app.[amzn1.ask.skill.7b21ed76-1c8d-483b-ac6f-899fd16469df]";
var SKILL_NAME = 'Tech Smart';

var DesignPatternSummary = [
    '<emphasis level="strong">Creational Patterns </emphasis>, Abstract Factory, Builder, Factory Method,Prototype, Singleton. ' +
    '<break time="3s"/><emphasis level="strong"></emphasis> Structural Patterns, Adapter, Bridge , Composite, Decorator, Facade, Flyweight, Proxy. ' +
    '<break time="3s"/><emphasis level="strong">Behavioral Patterns</emphasis>, Chain of Responsibility, Command, Interpreter, Iterator, Mediator, Memento, Observer, State, Strategy, Template Method, Visitor'
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
        var summary = DesignPatternSummary  [0];
        // Create speech output
        speechOutput = summary;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, summary)
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