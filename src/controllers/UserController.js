const Users = require("../models/users");

class UserController {

    create(req, resp, next) {
        let user = new Users(req.body);
        user.setType('USER');
        user.create();
        resp.status(201).json(user);
    }
}

module.exports = new UserController();