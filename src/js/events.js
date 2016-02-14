module.exports = new Events();

function Events() {
    const keys = {};

    this.on = function (key, response) {
        if (keys[key] === undefined) {
            keys[key] = [];
        }
        keys[key].push(response);
    };

    this.emit = function (key, payload) {
        const responses = keys[key];
        if (responses) {
            responses.forEach(response => {
               response(payload);
            });
        }
    };
}
