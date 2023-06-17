const express = require('express');

const AuthController = require('../../controllers/register');

const router = express.Router();
const jsonParser = express.json();

// const { authenticate } = require("../../middlewares/authenticate");

// router.use(authenticate);

router.get('/', jsonParser, AuthController.getAllUsers);

// post запит на регістрвцію
router.post('/register', jsonParser, AuthController.register);

// запит на авторизацію
router.post('/login', jsonParser, AuthController.login);

router.post('/logout', jsonParser, AuthController.logout);

module.exports = router;
