const express = require('express');
const router = express.Router();

const { schemaValidator, isBodyNotEmpty } = require('../../middlewares');
const { auth: ctrl } = require('../../controllers');

router.post('/signUp', ctrl.signUp);

module.exports = router;
