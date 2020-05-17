const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(`${__dirname}/signup.html`));

app.post('/', (req, res) => {

    var usr = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };

    console.log(usr);

});

app.listen(3000, () => console.log('Server running at port 30000'));