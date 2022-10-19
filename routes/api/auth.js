const express = require('express');
const ctrl = require('../../controllers/authControllers');
const { authValidation } = require('../../validation');

const router = express.Router();

router.post('/register', authValidation, ctrl.registeration);

module.exports = router;
