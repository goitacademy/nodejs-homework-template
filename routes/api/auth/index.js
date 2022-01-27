import { Router } from 'express';
import { registration, login, logout, getCurrentUser } from '../../../controllers/auth';
import guard from '../../../midllewares/auth/guard';
import { validateAuth } from '../../../midllewares/validation/userValidation';

const router = new Router();

router.post('/users/signup', validateAuth, registration);
router.post('/users/login', validateAuth, login);
router.post('/users/logout', guard, logout);
router.get('/users/current', guard, getCurrentUser);

export default router;