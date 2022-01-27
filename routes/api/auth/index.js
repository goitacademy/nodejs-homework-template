import { Router } from 'express';
import {
  validateCreate,
  validateCredentials,
  validateUpdateSubscription,
  validateToken,
} from './validation';
import { Roles } from '../../../connection/constants';
import {
  registration,
  login,
  logout,
  getCurrent,
  updateSubscription,
} from '../../../controllers/auth';
import guard from '../../../middlewares/guard';
import roleAccess from '../../../middlewares/roleAcces';

const router = new Router();

router.patch(
  '/',
  [guard, roleAccess(Roles.PRO), validateUpdateSubscription],
  updateSubscription,
);
router.post('/signin', validateCreate, registration);
router.post('/login', validateCredentials, login);
router.get('/logout', guard, logout);
router.get('/current', validateToken, guard, getCurrent);

export default router;