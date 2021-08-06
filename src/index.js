const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult, checkSchema } = require('express-validator');
const { validate } = require('./validate');
const { registrationSchema } = require('./registrationValidation');

const app = express();
const port = 2022;



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json);

app.post('/register',validate(checkSchema(registrationSchema)) , (req, res) => {
    res.status(200).json({
        success: true,
        message: "Registration was successful",
    });
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});