const model = require('../models/user.model');

function httpRegister(req, res) {
    
    const newUser = {
        username: req.body.username,
        gender: req.body.gender,
        password: req.body.password,
        phone: req.body.phone,
        email: req.body.email,
    }

    model.push(newUser);
    res.json(newUser);
}

function httpGetRegisters (req, res) {
    res.json(newUser);
}

module.exports = {
    httpRegister,
    httpGetRegisters,
};