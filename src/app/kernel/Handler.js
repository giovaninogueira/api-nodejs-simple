global.express = require('express');
const Database = require('../../database/Database');

class Handler {
    constructor () {
        let express = global.express;
        this.express = express();
        this.connections = {};
    }

    runServer(port, fn = null) {
        this.boot();
        this.port = port;
        this.server = this.express.listen(port, () => {
            if (typeof fn == 'function') {
                fn();
            } else {
                const address = this.server.address().address;
                console.log(`running in ${address}:${this.port}`);
            }
        });
        return this;
    }

    addConnection(name) {
        this.connections[name] = new Database(name);
    }

    middlewares() {
        this.addMiddlewares(global.express.json());
        this.addMiddlewares(global.express.urlencoded({
            extended: true
        }));
        return this;
    }

    addMiddlewares(middleware, route = null) {
        if (route) {
            this.express.use(route, middleware);
            return this;
        }
        this.express.use(middleware);
        return this;
    }
}

module.exports = Handler;