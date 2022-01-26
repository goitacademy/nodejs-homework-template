import { Router } from 'express'
import { registration, login, logout } from '../../../controllers/auth'
import guard from '../../../middlewares/guard'
import limiter from '../../../middlewares/rate-limit'
const router = new Router()

router.post('/registration', limiter(15 * 60 * 1000, 2), registration)
router.post('/login', login)
router.post('/logout', guard, logout)

export default router
