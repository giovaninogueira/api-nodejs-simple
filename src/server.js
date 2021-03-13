'use strict';
/**
 * Configuration server application
 */

const App = require('./app/kernel/App');

const appObj = new App();
appObj.boot();
appObj.runServer(3000);