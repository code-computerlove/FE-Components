require('localhost')('./components').listen(8081);

const tabs = require('./tabs/index')();
const accordion = require('./accordion/index')();
const modal = require('./modal-dialog/index')();
