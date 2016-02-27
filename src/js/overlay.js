const trkl = require('trkl');

module.exports = Overlay;

function Overlay(app, microphone, recipe) {
    // Here, I have experimented with the idea I could write my view using template strings, composing my HTML out of
    // computed observables returning sub-views when model properties change.
    // It's a nice idea in theory, but not very efficient - probably not suitable for large-scale apps.

    const container = createContainer();

    const containerClasses = trkl.computed(()=> {
        return `overlay overlay-${app.isActive() ? "open" : "closed"}`;
    });

    const currentStepHtml = trkl.computed(()=> {
        return `
            <h2>Current step:</h2>
            <p>${recipe.currentStep()}</p>
        `;
    });

    const lastCommandHtml = trkl.computed(()=> {
        const lastCommand = microphone.lastCommand();
        return `
            <h2>Last command:</h2>
            <p>${lastCommand ? toTitleCase(lastCommand) : "(Say something)"}</p>
        `;
    });

    const viewHtml = trkl.computed(()=> {
        return `
            <h1>Hands free ${recipe.title}</h1>
            <p>Click / press the screen or say 'exit' to quit</p>
            <p>Say 'continue' to go forwards, 'previous' to go back, or 'repeat' to retry</p>
            ${currentStepHtml()}
            ${lastCommandHtml()}
        `;
    });

    // Subscribe view to stream results

    trkl.computed(function syncContainerClasses() {
        container.className = containerClasses();
    });

    trkl.computed(function syncContainerHtml() {
        container.innerHTML = viewHtml();
    });

    // Allow user to 'click out' of the application
    container.addEventListener('click', ()=> {
        app.isActive(false);
    });

}

function createContainer() {
    const container = document.createElement('div');
    document.body.appendChild(container);
    return container;
}

function toTitleCase(string) {
    return  string.slice(0, 1).toUpperCase() +
            string.slice(1).toLowerCase();
}