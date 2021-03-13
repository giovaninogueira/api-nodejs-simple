const dbs = require('../config/database');

class Database {
    constructor (connectionName) {
        if (!dbs[connectionName]) {
            let error = new Error('Connection not found');
            error.status = 500;
            throw error;
        }
        this.name = connectionName;
        this.connection = dbs[connectionName];
        this.connection.connect(
            this.connection.config,
            this.connection.module
        );
    }
}

module.exports = Database;