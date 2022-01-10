import { Router } from 'express'
// import { validatorCreate, validatorId, validatorUpdate, validatorUpdateFavorite, validatorQuery} from '../../../midllewares/validation/usersValidation'
import {signup, login, logout} from '../../../controllers/users/index'
import guard from '../../../midllewares/guard'

const router = new Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', guard, logout)

export default router
