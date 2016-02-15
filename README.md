# A hands-free website

A demo of the new speech synthesis and voice recognition APIs, this website reads out steps in a recipe (specifically, for the classic Portugese soup _caldo verde_) and listens for navigation commands issued through the device microphone.

The idea is that a user could open a recipe on their phone and interact with the device without needing to touch it. If the meal is particularly messy, this means one less dirty phone or laptop.

At the time of writing, only Chrome supports both parts of the web speech API. To view the demo you'll need to clone the repository, run `npm install` and `gulp`, and then navigate to `https://localhost:8000`. HTTPS is a prerequisite for microphone access.

## Notes - in progress

App architecture:

MICROPHONE - emits voiceCommand events
SPEAKER - takes paragraphs of text, synthesis speech output
RECIPE - keeps track of current recipe steps
VIEW - visual interface of application
EVENTS - event emitter

bootfile.js
- finds a recipe component
- extracts recipe: data => new Recipe(data)
- finds a button & view template: el => new View(el)
- new Speaker();
- new Microphone();

VIEW ->
Attaches listener to button
On press, renders app view on screen, full size
Attaches listeners to view

EVENTS:
- voiceSpeaking()
- voiceCommand(command)
- openApp()
- closeApp()
- stepChange(integer, string)
- 
