let schema = require('../connections/mongoDB');

class Users {
    constructor (body) {
        this.id = body.id;
        this.name = body.name;
        this.email = body.email;
        this.password = body.password;
        this.git = body.git;
        this.tel = body.tel;
        this.cel = body.cel;
    }

    setType(type) {
        this.type = type;
        return this;
    }

    create() {
        return this;
    }
}

module.exports = Users;