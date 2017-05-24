# Overview
Develop Alexa skills for learning purpose and some useful application. This application called Tech Smart will give the information when asked about some technical questions. The technical questions include design patterns, powershell tips,
CSharp tips,Visual studio key board shortcuts.

# Steps
 Before designing Alexa app one has to decide how a user will interact with Alexa device. This has several components
 * for example for this sample app some of the ways user interacts are
 * Alexa ask Tech Smart for next design pattern
    * Will give the user about the next design patterns (remembers what was given last time)
 * Alexa ask Tech Smart for singleton design pattern
    * Will give more description about single design pattern



In above (Voice Design)
* __Alexa__ is __Wake Word__  (other wake words are __Amazon__ , __Echo__ )
* __ask__ is __Phrase__ ( some of the phrase words are __tell__)
* __Tech Smart__ is __Invocation Name__ (This is what applications has controls and also called __Skill__)
* __next design pattern__ is __Intent__ (This is application designed sentences)

![User interaction](https://github.com/sairamaj/alexa/blob/master/images/userinteraction.JPG)
![Voice Design](https://github.com/sairamaj/alexa/blob/master/images/VoiceDesign.PNG)
[Source](https://app.pluralsight.com/library/)

## Supported Phrases by Alexa are
  * Ask <invocation name>
     * to, about, for,if, whether, <blank>
  * Tell <invocation name>
     * to, that, <blank>
  * Other
     * Talk to, Open, Launch, Start, Use , Resume, Load,Begin
     * <phrase> <invocation> 
  * [For more info](http://amzn.to/1UmXGjz)

## Voice Interface is JSon
```json
  {
    "intents" :
    [
      {
		 "intent": "DesignPatternIntent",
         "intent": "AmazonHelpIntent"
      }  
  ]
 }
```
## Sample Utterances
* Key value pair in plain text which maps __intents__ to sample spoken phrases
* _DesignPatternIntent_ for next design pattern

## Slots
* Slots are arguments to Intents

# Simulator
* https://echosim.io/

# Utterences generator
* http://alexa-utter-gen.paperplane.io/
