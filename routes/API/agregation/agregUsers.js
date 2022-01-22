import {Router} from "express";
const router = new Router();
import {agregation, uploadAvatar} from '../../../controller/users/index.js'
import guard from '../../../midlewares/guard.js';
import { upload } from '../../../midlewares/upload.js'

router.get('/stats/:id', guard, agregation);
router.patch('/avatar', guard, upload.single('avatar') , uploadAvatar);

export default router  
