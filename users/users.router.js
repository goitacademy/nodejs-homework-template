const express = require('express');
const usersController = require('./users.controller');
const { validateUserMiddleware } = require('./users.validators');
const { authMiddleware } = require('../auth/auth.middleware');
const usersRouter = express.Router();

const upload = require('./user.avatar');

usersRouter.post('/signup', usersController.signUpHandler);
usersRouter.post('/login', usersController.loginHandler);
usersRouter.post('/logout', authMiddleware, usersController.logoutHandler);
usersRouter.get('/current', authMiddleware, usersController.currentHandler);
usersRouter.get('/secret', authMiddleware, (req, res) => res.status(200).send({ message: 'Hello from secret area!'}));

usersRouter.post('/avatar', upload.single('avatar'), (req, res) => {
    console.log(req.file);
    return res.status(201).send({message: 'ok'})
});

module.exports = usersRouter;