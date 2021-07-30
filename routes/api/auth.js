const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');
const { authenticate } = require('../../middlewares/authMiddlware');

router.post('/users/signup', ctrl.registr);
router.post('/users/login', ctrl.login);
router.post('/users/logout', authenticate, ctrl.logout);
router.get('/users/current', authenticate, ctrl.getCurrent);

module.exports = router;
