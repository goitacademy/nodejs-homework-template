import { Router } from 'express'
import { validatorCreate, validatorSubscription, validatorUpdateSubscription, validatorToken} from '../../../midllewares/validation/userValidation'
import {signup, login, logout, current, updateSubscription} from '../../../controllers/users/index'
import guard from '../../../midllewares/guard'
import subscriptionAccess from '../../../midllewares/subscriptionAccess'
import { Subscription } from '../../../lib/constants'

const router = new Router()

router.patch('/', [guard, subscriptionAccess(Subscription.PRO), validatorUpdateSubscription], updateSubscription)

router.post('/signup', validatorCreate, signup)
router.post('/login', validatorSubscription, login)
router.post('/logout', guard, logout)

router.get('/current', [guard, validatorToken], current)

export default router
