import { Router } from 'express'
import { aggregation, uploadAvatar, verifyUser, repeatEmailForVerifyUser, } from '../../../controllers/users'
import guard from '../../../middlewares/guard'
import { upload } from '../../../middlewares/upload'
import roleAccess from '../../../middlewares/role-access'
import { Role } from '../../../lib/constants'

const router = new Router()

router.get('/stats/:id', guard, roleAccess(Role.ADMIN), aggregation)
router.patch('/avatar', guard, upload.single('avatar'), uploadAvatar)
router.get('/verify/:token', verifyUser)
router.post('/verify', repeatEmailForVerifyUser)

export default router