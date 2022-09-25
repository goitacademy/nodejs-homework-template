const express = require('express');
const {
    registerUser,
    logInUser,
} = require('../../controllers/users/controller');

const ctrlWrapper = require('../../helpers/ctrlWrapper');

const router = express.Router();

router.post('/register', ctrlWrapper(registerUser));

router.post('/login', ctrlWrapper(logInUser));

module.exports = router;
