const { Router } = require('express');
const authenticate = require('../../middlewares/authenticate');
const validateBody = require('../../middlewares/validateBody');
const {
  userLoginJoiSchema,
  userRegisterJoiSchema,
} = require('../../utils/validation/userValidationSchemas');

const {
  register,
  login,
  logout,
  getCurrent,
} = require('../../controllers/authControllers');

const router = Router();

router.post('/register', validateBody(userRegisterJoiSchema), register);
router.post('/login', validateBody(userLoginJoiSchema), login);
router.post('/logout', authenticate, logout);
router.get('/current', authenticate, getCurrent);

module.exports = router;
