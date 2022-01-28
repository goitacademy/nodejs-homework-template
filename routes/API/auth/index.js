import {Router} from "express";
const router = new Router();
import {registration, logIn, logOut} from '../../../controller/auth/index.js'
import guard from '../../../midlewares/guard.js';
import { validateUserCreate, logInUserCreate } from '../../../midlewares/validationUser.js'


router.post('/signup', validateUserCreate, registration);
router.post('/login', logInUserCreate, logIn);
router.post('/logout',guard, logOut);

export default router   