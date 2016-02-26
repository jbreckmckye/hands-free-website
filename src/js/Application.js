const trkl = require('trkl').trkl;

module.exports = Application;

function Application() {
    this.isActive = trkl(false);
}
