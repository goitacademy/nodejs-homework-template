const express = require('express');

const ctrl = require('../../controllers/auth');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/signup', validateBody(schemas.signSchema), ctrlWrapper(ctrl.signup));
router.post('/login', validateBody(schemas.signSchema), ctrlWrapper(ctrl.login));
router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));
router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));
router.patch('/subscription', authenticate, validateBody(schemas.subscriptionSchema), ctrlWrapper(ctrl.subscription));

module.exports = router;
