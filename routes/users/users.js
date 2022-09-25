const express = require('express');
const { registerUser } = require('../../controllers/users/controller');

const ctrlWrapper = require('../../helpers/ctrlWrapper');

const router = express.Router();

router.post('/register', ctrlWrapper(registerUser));

module.exports = router;
