const { Router } = require("express");

const ctrl = require('../../controllers/users/index.js');

const { validateBody, authenticate } = require('../../middlewares');

const { schemas } = require('../../models/user.js');

const router = Router();

router.post("/users/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/users/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/users/current", authenticate, ctrl.getCurrent);

router.post('/users/logout', authenticate, ctrl.logout);

router.patch('/users/:id', authenticate, ctrl.updateSubscription);

module.exports = router;