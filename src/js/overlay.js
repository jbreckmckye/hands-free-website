module.exports = Overlay;

function Overlay() {
    const that = this;
    const model = {
        isActive : false,
        title : '',
        lastInput : ''
    };
    const container = createContainer();

    document.body.appendChild(container);

    that.render = ()=> {
        renderView(model, container);
    };

    that.update = updateModel;

    function createContainer() {
        const el = document.createElement('div');
        el.addEventListener('click', that.quit);
        return el;
    }

    function updateModel(key, val) {
        model[key] = val;
        that.render();
    }

    that.render();

}

function renderView(model, container) {
    // I was hoping to be able to jury-rig a react-esque approach just using template strings.
    // The results leave a little to be desired, however.

    container.className = `overlay overlay-${model.isActive ? 'open' : 'closed'}`;
    container.innerHTML = model.isActive ? renderInner() : '';

    function renderInner() {
        return `
            <h1>Hands free ${model.title}</h1>
            <p>
                Click / press the screen or say 'exit' to quit
            </p>
            ${renderLastHeard()}
        `;
    }

    function renderLastHeard() {
        if (model.lastInput !== '') {
            return `<p>Last heard: <em>${model.lastInput}</em>`;
        } else {
            return '';
        }
    }
}

