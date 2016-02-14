const events = require('./events');

events.on('something', data => {
    console.log(data);
});

window.setTimeout(()=> {
    events.emit('something', 'hello world');
}, 3000);