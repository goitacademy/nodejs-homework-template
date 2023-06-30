const express = require("express");

const ctrl = require('../../controller');

const router = express.Router();

const { validateBody, authenticate, upload } = require("../../middleware");

const { userSchemas } = require("../../models");

router.post('/register', validateBody(userSchemas.registerSchema), ctrl.register );

router.post('/login', validateBody(userSchemas.loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar );

module.exports = router;
