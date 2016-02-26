module.exports = StartButton;

function StartButton(app, element) {
    element.addEventListener('click', ()=> {
        app.isActive(true);
    });
}
