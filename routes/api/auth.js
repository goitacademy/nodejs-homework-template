const express = require('express');
const router = express.Router();
const { schemaValidator, isBodyNotEmpty } = require('../../middlewares');
const ctrl = require('../../controllers/auth');
router.post('/signup', isBodyNotEmpty(), schemaValidator, ctrl.signUp);
router.post('/login', isBodyNotEmpty(), schemaValidator, ctrl.logIn);

module.exports = router;
