const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 2022;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json);

app.post('/register', (req, res) => {});

app.listen(port);
console.log(`Server running on port: ${port}`);