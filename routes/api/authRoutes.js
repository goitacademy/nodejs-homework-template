import express from 'express';

import login from '../../users/login.js';
import logout from '../../users/logout.js';
import signup from '../../users/signup.js';
import avatar from '../../users/avatar.js';

import current from '../../users/current.js';

const router = express.Router();

router.use('/', signup);
router.use('/', login);
router.use('/', logout);
router.use('/', current);
router.use('/', avatar);


export default router;
