const express = require('express');
const { validate } = require('../../middlewares/validator');
const schemas = require('../../shema/shema');
const register = require('../../controllers/auth');

const router = express.Router();

router.post('/register', validate(schemas.registerSchema), register);

module.exports = router;
