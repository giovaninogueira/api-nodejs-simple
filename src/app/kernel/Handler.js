global.express = require('express');

const Database = require('../../database/Database');
const configApp = require('../../config/app');
const jwt = require('jsonwebtoken');

class Handler {
    constructor () {
        let express = global.express;
        this.express = express();
        this.connections = {};
        this.privateKey = configApp.private_key_jwt;
        this.timeMinute = configApp.time_minute_expirate_jwt;
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

    verifyToken(req, res, next) {
        const token = req.headers['x-access-token'];

        if (!token) {
            return res.status(401).json({
                auth: false, 
                message: 'No token provided.'
            });
        }
        
        jwt.verify(token, configApp.private_key_jwt, (err, decoded) => {
          if (err) {
            return res.status(500).json({
                auth: false,
                message: 'Failed to authenticate token.'
            });
          }
          global.userAuth = decoded;
          next();
        });
    }

    createToken(obj) {
        obj['iat'] = Math.floor(Date.now() / 1000) - this.timeMinute;
        return jwt.sign(obj, configApp.private_key_jwt);
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