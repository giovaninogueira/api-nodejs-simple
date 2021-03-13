const User = require("../schema/User");

class UserController {

    constructor () {

    }

    async login(request, response) {
        let body = request.body;
        body.password = require('crypto')
         .createHmac('sha256', body.password)
         .digest();

        let user = await User.findOne({
            email: body.email,
            password: body.password
        }, {
            name: 1,
            email: 1,
            type_user: 1
        });

        if (user) {
            const tokenJwt = global.appObj.createToken({
                id: user._id,
                name: user.name,
                email: user.email,
                type_user: user.type_user
            });
            return response.json({
                token: tokenJwt
            });
        }

        return response.json({
            msg: 'E-mail ou password inválido'
        }).status(400);
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

        await User.create(body);

        return response.json({
            msg: 'Usuário Criado com sucesso!'
        }).status(201);
    }

    async update(request, response) {
        let body = request.body;

        if (global.userAuth.email != body.email) {
            let findUser = await User.count({
                email: body.email
            });
    
            if (findUser) {
                return response.json({
                    'msg': 'E-mail using'
                }).status(400);
            }
        }

        if (body['password']) {
            body.password = require('crypto')
            .createHmac('sha256', body.password)
            .digest();
        }

        await User.updateOne({
            _id: global.userAuth.id
        }, {
            $set: body
        });

        return response.json({
            msg: 'Usuário Alterado com sucesso!'
        }).status(201);
    }
}

module.exports = new UserController();