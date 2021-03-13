const Handler = require('./Handler');
class App extends Handler {

    constructor () {
        super();
        this.port = null;
    }

    boot() {
        this.middlewares();
        this.customMiddlewares();
        this.database();
        this.routes();
        return this;
    }

    routes() {
        this.addMiddlewares(require('../../config/routes'));
    }

    customMiddlewares() {
        // custom middlewares of users
    }

    /**
     * Connections of databases
     */
    database() {
        this.addConnection('mongoDB');
    }
}

module.exports = App;