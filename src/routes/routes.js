let router = require('express')();

router.use('/user', require('./user'));

module.exports = router;