const express = require('express');
const { controllerWrapper, validateBody } = require('../../helpers');
const { register, login } = require('../../controllers/users');
const { usersSchema } = require('../../schemas/usersSchema');

const router = express.Router();

router.post('/register', validateBody(usersSchema), controllerWrapper(register));
router.post('/login', validateBody(usersSchema), controllerWrapper(login));

module.exports = router;
