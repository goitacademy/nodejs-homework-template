const express = require('express');
const ctrl = require('../../controllers/authCtrl');
const authenticate = require('../../middlewares/authenticate');
const router = express.Router();



router.post('/register', ctrl.register );
router.post('/login', ctrl.login);
router.post('/logout', authenticate, ctrl.logout);
router.get('/current', authenticate, ctrl.getCurrent);
router.patch('/',authenticate,ctrl.updateSubscription);

module.exports = router;