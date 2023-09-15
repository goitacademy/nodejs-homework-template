const express = require('express');

const controllers = require('../../controllers/users');

const { validateBody } = require('../../middlewares');

const schemas = require('../../utils/validation/userValidationSchemas');

const router = express.Router();

router.post(
  '/register',
  validateBody(schemas.registerSchema),
  controllers.register
);

router.post('/login', validateBody(schemas.loginSchema), controllers.login);
module.exports = router;
