const express = require('express');

const userController = require('../controllers/registration.controller');

const userRouter = express.Router();

userRouter.use((req, res, next) => {
    console.log('ip:', req.ip);
    next();
});

userRouter.get('/', userController.httpGetRegisters);
userRouter.post('/', userController.httpRegister);

module.exports = userRouter;