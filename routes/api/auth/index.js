import { Router } from 'express'
import {
   signup,
   login,
   logout,
   current
    } from '../../../controllers/auth'

    import {
        validateSignup,
        validateLogin
        } from '../auth/validation'
    
import guard from '../../../middlewares/guard'
const router = new Router()

router.post('/signup', validateSignup, signup)
router.post('/login', validateLogin, login)
router.post('/logout', guard, logout)
router.get('/current', guard, current);

export default router
