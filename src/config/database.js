
module.exports = {
    mongoDB : {
        name: 'mongoDB',
        module: require('mongoose'),
        config: {
            url: 'mongodb://localhost/employ'
        },
        connect: (config, module) => {
            let con = module.connect(config.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        }
    }
};