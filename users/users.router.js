const express = require('express');
const usersController = require('./users.controller');

const usersRouter = express.Router();

usersRouter.post('/signup', usersController.signUpHandler);

module.exports = {
    usersRouter,
}