import { Router } from 'express';
import auth from '../../../middlewares/auth';
import ctrlTryCatchWrapper from '../../../helpers/ctrlTryCatchWrapper';
import ctrls from '../../../controllers/auth';

const router = Router();

// router.use('/current', auth, ctrlTryCatchWrapper(ctrls.getCurrent);

router.use('/register', ctrlTryCatchWrapper(ctrls.register));

// router.use('/login', auth, ctrlTryCatchWrapper(ctrls.login);

// router.use('/logout', auth, ctrlTryCatchWrapper(ctrls.logout);

export default router;
