const User = require("../schema/User");

class UserController {

    constructor () {

    }

    async store(request, response) {
        let body = request.body;

        let findUser = await User.count({
            email: body.email
        });

        if (findUser) {
            return response.json({
                'msg': 'E-mail using'
            }).status(400);
        }

        body['type_user'] = 'USER';

        body.password = require('crypto')
         .createHmac('sha256', body.password)
         .digest();

        const data = await User.create(body);
        
        return response.json(data);
    }
}

module.exports = new UserController();