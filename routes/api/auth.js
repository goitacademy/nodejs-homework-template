const express = require('express');

const validateBody = require('../../middleware/validateBody');
const schemas = require('../../schemas/userSchemas');
const authController = require('../../controllers/contact/AuthController');
const authenticate = require('../../middleware/authenticate');

const router = express.Router();

router.post(
  '/register',
  validateBody(schemas.registerSchema),
  authController.register
);

router.post('/login', validateBody(schemas.loginSchema), authController.login);

router.post('/logout', authenticate, authController.logout);

router.post('/current', authenticate, authController.current);

router.patch(
  '/',
  authenticate,
  validateBody(schemas.updateSchema),
  authController.update
);

module.exports = router;
