const trkl = require('trkl');

module.exports = Speaker;

function Speaker(app, recipe, microphone) {

    trkl.computed(function readCurrentStep() {
        if (app.isActive()) {
            speak(recipe.currentStep());
        }
    });

    trkl.computed(function muteOnClose() {
        if (!app.isActive()) {
            window.speechSynthesis.cancel();
        }
    });

    microphone.lastCommand.subscribe(function repeat(newCommand) {
        // I know this looks like it could be abstracted away into something common with readCurrentStep,
        // but I'd rather not conceal the subscriptions that any computeds would create
        if (app.isActive() && newCommand === 'repeat') {
            speak(recipe.currentStep())
        }
    });

    function speak(text) {
        window.speechSynthesis.cancel();

        var msg = new SpeechSynthesisUtterance();
        msg.volume = 1; // 0 to 1
        msg.rate = 0.8; // 0.1 to 10
        msg.pitch = 1; //0 to 2
        msg.text = text;
        msg.lang = 'en-GB';

        window.speechSynthesis.speak(msg);
    }

}