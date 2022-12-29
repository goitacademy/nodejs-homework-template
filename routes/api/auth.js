const express = require('express');

const ctrl = require('../../controller/auth');

const {schemas} = require("../../models/user")

const { validateBody, authenticate } = require('../../middlewares');

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register)

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.get('/logout', authenticate, ctrl.logout);

router.patch('/users', authenticate, validateBody(schemas.updateSubscriptionSchema), ctrl.updateSubscription);


module.exports = router;