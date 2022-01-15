import {Router} from 'express'
import { signup, login, logout, current, updateUser } from '../../../controllers/auth'
import guard from '../../../middlewares/guard'

import { 
  validateUser } from './validation'

const router = new Router()


router.post('/signup', validateUser, signup)
router.post('/login', validateUser, login)
router.get('/logout', guard, logout)
router.get('/current', guard, current)
router.patch('/', guard, updateUser)

export default router
