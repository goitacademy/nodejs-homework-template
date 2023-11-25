import express from 'express';

import login from '../../users/login.js';
import logout from '../../users/logout.js';
import signup from '../../users/signup.js';
import current from '../../users/current.js';
import { addContactSchema, updateContactSchema } from '#validators';


const router = express.Router();

router.use('/', signup);
router.use('/', login);
router.use('/', logout);
router.use('/', current);

export default router;
