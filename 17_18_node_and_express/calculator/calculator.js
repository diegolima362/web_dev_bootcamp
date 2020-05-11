const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendfile(`${__dirname}/index.html`);
});

app.post('/', (req, res) => {
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);

    var result = num1 + num2;

    res.send(`Result: ${result}`);
});

app.get('/bmicalculator', (req, res) => res.sendfile(`${__dirname}/bmicalculator.html`));
app.post('/bmicalculator', (req, res) => {
    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);

    var bmi = weight / (height * height);

    res.send(`Your BMI is ${bmi}`);
})

app.listen(3000, () => console.log('Server started on port 3000'));