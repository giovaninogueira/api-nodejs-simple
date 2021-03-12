let express = require('express');
let app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// routes
app.use('/', require('../routes/routes'));

let server = app.listen(3000, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log(`running in ${host}:${port}`);
});