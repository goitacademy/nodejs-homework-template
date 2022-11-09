const express = require('express');
const userControlers = require('../controlers/userControlers');


const userRouter = express.Router();

userRouter.post('/register', userControlers.register);
userRouter.post('/login', userControlers.login);


module.exports = {
  userRouter,
};

