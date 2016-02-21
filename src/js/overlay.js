const events = require('./events');

module.exports = Overlay;

function Overlay(recipe) {
    const container = createContainer();
    const model = {
        isActive : false,
        title : recipe.title,
        output : 'Sweat your onions, you fool!',
        lastInput : ''
    };

    container.addEventListener('click', ()=> events.emit('quit'));

    events.on('voiceInput', phrase => {
        updateModel('lastInput', toTitleCase(phrase));
    });

    events.on('quit', ()=> updateModel('isActive', false));

    events.on('start', ()=> updateModel('isActive', true));

    render();

    function updateModel(key, val) {
        model[key] = val;
        render();
    }

    function render() {
        renderView(model, container);
    }
}

function renderView(model, container) {
    // I was hoping to be able to jury-rig a react-esque approach just using template strings.
    // In practice the approach has some limitations.

    container.className = `overlay overlay-${model.isActive ? 'open' : 'closed'}`;
    container.innerHTML = model.isActive ? renderInner() : '';

    function renderInner() {
        return `
            <h1>Hands free ${model.title}</h1>
            <p>Click / press the screen or say 'exit' to quit.</p>
            <p>Say 'continue' to go forwards, 'previous' to go back, or 'repeat' to retry</p>
            ${renderOutput()}
            ${renderLastHeard()}
        `;
    }

    function renderOutput() {
        return `
            <h2>Current step:</h2>
            <p>${model.output}</p>
        `;
    }

    function renderLastHeard() {
        return `
            <h2>Last command:</h2>
            <p>${model.lastInput !== '' ? model.lastInput : '(Say something)'}</p>
        `;
    }
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