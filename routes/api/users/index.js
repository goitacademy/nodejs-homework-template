import { Router } from 'express'
import { aggregation } from '../../../controllers/users'
    
import guard from '../../../middlewares/guard'
import roleAccess from '../../../middlewares/role-access'
import { Role } from '../../../lib/constants'

const router = new Router()

router.get('/stats/:id', guard, roleAccess(Role.ADMIN), aggregation)

export default router