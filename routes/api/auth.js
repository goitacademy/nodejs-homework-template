const express = require('express');
const router = express.Router();
const { schemas } = require('../../models/user');
const { validateBody, auth, upload } = require('../../middlewares');
const ctrl = require('../../controllers/auth');

router.post('/register', validateBody(schemas.registerSchema), ctrl.registerCtrl);
router.post('/login', validateBody(schemas.loginSchema), ctrl.loginCtrl);
router.get('/current', auth, ctrl.getCurrentCtrl);
router.post('/logout', auth, ctrl.logoutCtrl);
router.patch(
  '/',
  auth,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscriptionCtrl,
);
router.patch('/avatars', auth, upload.single('avatar'), ctrl.updateAvatarCtrl);

module.exports = router;
