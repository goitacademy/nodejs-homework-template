import express from 'express';
import {
  signupController,
  loginController,
  logoutController,
  updateSubscriptionController,
  getCurrentUserController,
} from '../../controllers/authController.js';
import { errorWrapper } from '../../helpers/errorWrapper.js';
import { validateBody } from '../../middleware/validateBody.js';
import { userSchema } from '../../schemas/userSchema.js';

const router = new express.Router();

router.post(
  '/signup',
  validateBody(userSchema),
  errorWrapper(signupController)
);
router.post('/login', validateBody(userSchema), errorWrapper(loginController));
router.get('/logout', errorWrapper(logoutController));
router.get('/current', errorWrapper(getCurrentUserController));
router.patch('/', errorWrapper(updateSubscriptionController)); //! additional

export default router;
