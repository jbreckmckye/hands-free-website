const trkl = require('trkl');

module.exports = Microphone;

function Microphone(app) {
    const RecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition;
    const recognition = new RecognitionConstructor();

    // Keep listening even after user pauses
    recognition.continuous = true;

    // Only want to respond to finalized results
    recognition.interimResults = false;

    recognition.onresult = (event) => {
        const updatedResult = event.results[event.resultIndex];
        const bestMatch = updatedResult[0].transcript; // result-lists are arrays of the best-to-worst recognition matches
        const words = bestMatch.split(' ');
        const command = words[words.length - 1].toLowerCase();
        this.lastCommand(command);
    };

    trkl.computed(function watchAppState() {
        const shouldListen = app.isActive();
        if (shouldListen) {
            recognition.start();
        } else {
            recognition.stop();
        }
    });

    this.lastCommand = trkl();

    this.lastCommand.subscribe(newVal => {
        console.log(newVal);
    });

}