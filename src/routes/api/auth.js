import express from 'express';
import {
  signupController,
  loginController,
  logoutController,
  updateSubscriptionController,
  getCurrentUserController,
  updateAvatarController,
  emailVerificationController,
  resendEmailVerificationController,
} from '../../controllers/authController.js';
import { errorWrapper } from '../../helpers/errorWrapper.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { updateImageMiddleware } from '../../middleware/updateImageMiddleware.js';
import { upload } from '../../middleware/uploadMiddleware.js';
import { validateBody } from '../../middleware/validateBody.js';
import { resendEmailSchema } from '../../schemas/resendEmailSchema.js';
import { userSchema } from '../../schemas/userSchema.js';
import { userSubscriptionSchema } from '../../schemas/userSubscriptionSchema.js';

const router = new express.Router();

router.post(
  '/signup',
  validateBody(userSchema),
  errorWrapper(signupController)
);
router.get(
  '/verify/:verificationToken',
  errorWrapper(emailVerificationController)
);
router.post(
  '/verify',
  validateBody(resendEmailSchema),
  errorWrapper(resendEmailVerificationController)
);
router.post('/login', validateBody(userSchema), errorWrapper(loginController));
router.get('/logout', authMiddleware, errorWrapper(logoutController));
router.get('/current', authMiddleware, errorWrapper(getCurrentUserController));
router.patch(
  '/',
  [authMiddleware, validateBody(userSubscriptionSchema)],
  errorWrapper(updateSubscriptionController)
);
router.patch(
  '/avatars',
  [authMiddleware, upload.single('avatar'), updateImageMiddleware],
  errorWrapper(updateAvatarController)
);

export default router;
