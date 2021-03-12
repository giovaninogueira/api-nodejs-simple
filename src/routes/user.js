let router = require('express')();
let userController = require('../controllers/UserController');

router.post('/', userController.create);

module.exports = router;