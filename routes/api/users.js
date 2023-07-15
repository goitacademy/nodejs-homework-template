const express = require('express');
const { controllerWrapper, validateBody } = require('../../helpers');
const { register } = require('../../controllers/users');
const { usersRegisterSchema } = require('../../schemas/usersSchema');

const router = express.Router();

router.post('/register', validateBody(usersRegisterSchema), controllerWrapper(register));
router.post('/login', controllerWrapper());

module.exports = router;
