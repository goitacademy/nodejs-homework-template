import {Router} from "express";
const router = new Router();
import {agregation} from '../../../controller/users/index.js'
import guard from '../../../midlewares/guard.js'

router.get('/stats/:id', guard, agregation);

export default router  
