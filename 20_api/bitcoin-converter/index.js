const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`));

app.post('/', (req, res) => {
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var amount = parseFloat(req.body.amount);

    var options = {
        url: "https://api.coingecko.com/api/v3/coins/markets",
        method: "GET",
        qs: {
            vs_currency: fiat,
            ids: crypto
        }
    }

    request(options, (error, response, body) => {
        var data = JSON.parse(body);      
        var price = parseFloat(data[0].current_price);
        var convertedPrice = amount * price;
        var lastUpdated = data[0].last_updated;

        res.write(`<p>Last updated: ${lastUpdated}</p>`);
        res.write(`<h1>${amount} ${crypto} is currently worth ${convertedPrice} ${fiat}</h1>`);
        res.send();
    });
});

app.listen(3000, () => { console.log('Server is runnin on port 3000') });
