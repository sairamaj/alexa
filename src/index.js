'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = "amzn1.echo-sdk-ams.app.[amzn1.ask.skill.7b21ed76-1c8d-483b-ac6f-899fd16469df]";
var SKILL_NAME = 'Tech Smart';

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

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('DesignPatternSummary');
    },
    'DesignPatternSummaryIntent': function () {
        this.emit('DesignPatternSummary');
    },
    'DesignPatternIntent' : function() {
        this.emit('DesignPatternInfo')
    },
    'DesignPatternSummary': function () {
        var speechOutput = DesignPatternSummary + AskUserForSpecificPattern
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, speechOutput)
    },
    'DesignPatternInfo': function () {
        var patternName = this.event.request.intent.slots.name.value
        var speechOutput
        patternName = patternName.toLowerCase()
        if( patternsInfo[patternName] === undefined ){
            speechOutput = patternName + ' is not supported'
        }else{
            speechOutput = patternsInfo[patternName]
        }
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, speechOutput)
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