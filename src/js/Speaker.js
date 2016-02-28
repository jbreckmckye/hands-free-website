const trkl = require('trkl');

module.exports = Speaker;

function Speaker(app, recipe) {
    const voices = new Voices();

    function speak(phrase) {
        window.speechSynthesis.cancel();

        var msg = new SpeechSynthesisUtterance();
        msg.volume = 1; // 0 to 1
        msg.rate = 0.8; // 0.1 to 10
        msg.pitch = 1; //0 to 2
        msg.text = text;
        msg.lang = 'en-GB';
        msg.voice = voices.getNewVoice();

        window.speechSynthesis.speak(phrase);
    }

    trkl.computed(function syncWithState() {
        const stepToRead = recipe.currentStep();
        const shouldBeReading = app.isActive();

        if (!shouldBeReading) {
            window.speechSynthesis.cancel();
        } else {
            speak(stepToRead);
        }
    });

}

function Voices() {
    const voices = window.speechSynthesis.getVoices();
    const actor1 = getFemale() || getDefault();
    const actor2 = getMale() || getDefault();
    let currentActor = actor1;

    this.getNewVoice = ()=> {
        currentActor = (currentActor === actor1) ? actor2 : actor1;
        return currentActor;
    };

    function getMale() {
        return voices.find(voice => {
            return voice.name.match('English Male');
        });
    }

    function getFemale() {
        return voices.find(voice => {
            return voice.name.match('English Male');
        });
    }

    function getDefault() {
        return voices.find(voice => {
            return voice.default;
        });
    }

}