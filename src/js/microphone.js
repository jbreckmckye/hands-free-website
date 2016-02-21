module.exports = new Microphone();

function Microphone() {
    const RecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition;
    const recognition = new RecognitionConstructor();
    const commandRegister = {};

    // Keep listening even after user pauses
    recognition.continuous = true;

    // Only want to respond to finalized results
    recognition.interimResults = false;

    recognition.onstart = ()=> {
        console.log('Begin listening');
    };

    recognition.onresult = (event) => {
        const updatedResult = event.results[event.resultIndex];
        const bestMatch = updatedResult[0]; // result-lists are arrays of the best-to-worst recognition matches
        const words = bestMatch.split(' ');
        const command = words[words.length - 1];
        console.log('Command:', command);
    };

    this.registerCommand = (key, fn) => {
        commandRegister[key] = fn;
    };

    this.beginListening = ()=> {
        recognition.start();
    };

}