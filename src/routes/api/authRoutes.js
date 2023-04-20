const { Router } = require('express');
const authenticate = require('../../middlewares/authenticate');
const validateBody = require('../../middlewares/validateBody');
const {
  userLoginJoiSchema,
  userRegisterJoiSchema,
  updateSubscriptionSchema,
} = require('../../utils/validation/userValidationSchemas');

const {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
} = require('../../controllers/authControllers');

const router = Router();

router.post('/register', validateBody(userRegisterJoiSchema), register);
router.post('/login', validateBody(userLoginJoiSchema), login);
router.post('/logout', authenticate, logout);
router.get('/current', authenticate, getCurrent);
router.patch(
  '/subscription',
  authenticate,
  validateBody(updateSubscriptionSchema),
  updateSubscription
);

module.exports = router;
