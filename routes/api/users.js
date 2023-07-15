const express = require('express');
const { controllerWrapper, validateBody } = require('../../helpers');
const { register, login, logout } = require('../../controllers/users');
const { usersSchema } = require('../../schemas/usersSchema');
const { auth } = require('../../middlewares');

const router = express.Router();

router.post('/register', validateBody(usersSchema), controllerWrapper(register));
router.post('/login', validateBody(usersSchema), controllerWrapper(login));
router.post('/logout', controllerWrapper(auth), controllerWrapper(logout));

module.exports = router;
