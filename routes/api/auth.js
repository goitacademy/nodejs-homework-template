const express = require("express");
const router = express.Router();
const { validateBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/user');
const ctrlr = require('../../controllers/auth');

router.post('/register', validateBody(schemas.registerSchema), ctrlr.register);
router.post('/login', validateBody(schemas.loginSchema), ctrlr.login);
router.get('/current', authenticate, ctrlr.getCurrent);
router.post('/logout', authenticate, ctrlr.logout);
router.patch('/users', authenticate, validateBody(schemas.updateUserSubcriptionSchema), ctrlr.updateById);

module.exports = router;