const express = require('express');
const { validate } = require('../../middlewares/validator');
const schemas = require('../../shema/shema');
const register = require('../../controllers/auth');

const router = express.Router();

router.post('/register', validate(schemas.registerSchema), register.register);
router.post('/login',validate(schemas.loginSchema), register.login )

module.exports = router;
