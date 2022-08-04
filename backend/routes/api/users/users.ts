import { Router } from 'express';

import auth from '../../../middlewares/auth';
import ctrlTryCatchWrapper from '../../../helpers/ctrlTryCatchWrapper';
import ctrls from '../../../controllers/auth';
const router = Router();

router.get('/logout', auth, ctrlTryCatchWrapper(ctrls.logout));

router.get('/current', auth, ctrlTryCatchWrapper(ctrls.getCurrent));

router.post('/signup', ctrlTryCatchWrapper(ctrls.signup));

router.post('/login', ctrlTryCatchWrapper(ctrls.login));

router.patch('/', auth, ctrlTryCatchWrapper(ctrls.updateSubscription));

export default router;
