import express from 'express';

import signup from '#users/signup.js';
import login from '#users/login.js';
import logout from '#users/logout.js';
import avatar from '#users/avatar.js';
import current from '#users/current.js';
import emailVerification from '#users/emailVerification.js';

const router = express.Router();

router.use('/', signup);
router.use('/', login);
router.use('/', logout);
router.use('/', current);
router.use('/', avatar);

router.use('/', emailVerification);

export default router;
