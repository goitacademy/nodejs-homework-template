import {Router} from "express";
const router = new Router();
import {agregation, uploadAvatar, verifyUser, repeatEmailForVerifyUser} from '../../../controller/users/index.js'
import guard from '../../../midlewares/guard.js';
import { upload } from '../../../midlewares/upload.js';
import {emailValidate} from '../../../midlewares/emailValidate.js'

router.get('/stats/:id', guard, agregation);
router.patch('/avatar', guard, upload.single('avatar') , uploadAvatar);
router.get('/verify/:token',  verifyUser );
router.post('/verify', emailValidate, repeatEmailForVerifyUser )

export default router  
