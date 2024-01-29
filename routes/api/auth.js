import { Router } from 'express'
import {
  getCurrent,
  login,
  logout,
  register,
  resendVerifyEmail,
  subscription,
  updateAvatar,
  verify,
} from '../../controllers/authController.js'
import { validateBody } from '../../decorators/validateBody.js'
import { authenticate } from '../../middlewares/authenticate.js'
import { isEmptyBody } from '../../middlewares/isEmptyBody.js'
import { upload } from '../../middlewares/upload.js'
import { userEmailSchema, userLoginSchema, userRegisterSchema, userSubscriptionSchema } from '../../models/User.js'

export const authRouter = Router()

authRouter.post('/register', isEmptyBody, validateBody(userRegisterSchema), register)

authRouter.get('/verify/:verificationToken', verify)

authRouter.post('/verify', isEmptyBody, validateBody(userEmailSchema), resendVerifyEmail)

authRouter.post('/login', isEmptyBody, validateBody(userLoginSchema), login)

authRouter.get('/current', authenticate, getCurrent)

authRouter.post('/logout', authenticate, logout)

authRouter.patch('/', authenticate, isEmptyBody, validateBody(userSubscriptionSchema), subscription)

authRouter.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar)
