'use strict';
/**
 * Configuration server application
 */

const App = require('./app/kernel/App');

global.userAuth = null;

global.appObj = new App();
global.appObj.boot();
global.appObj.runServer(3000);