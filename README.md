# A hands-free website

A demo of the new speech synthesis and voice recognition APIs, this website reads out steps in a recipe (specifically, for the classic Portugese soup _caldo verde_) and listens for navigation commands issued through the device microphone.

The idea is that a user could open a recipe on their phone and interact with the device without needing to touch it. If the meal is particularly messy, this means one less dirty phone or laptop.

At the time of writing, only Chrome supports both parts of the web speech API. To view the demo you'll need to clone the repository, run `npm install` and `gulp`, and then navigate to `https://localhost:8000`. HTTPS is a prerequisite for microphone access. 