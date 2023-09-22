const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");

const { registerSchema } = require("../../schemas/auth");

const ctrl = require("../../controllers/auth");
 
const router = express.Router();

router.post('/register', validateBody(registerSchema), ctrl.register);

router.post('/login', validateBody(registerSchema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

module.exports = router;