const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://localhost/employ',  {
        useNewUrlParser: true,
        useUnifiedTopology: true
});

const schema = mongoose.Schema;

const db = mongoose.connection;

db.on('error', () => {
    console.error.bind(console, 'connection error:')
});

db.once('open', () => {
  console.log('oii');
});

module.exports = schema;