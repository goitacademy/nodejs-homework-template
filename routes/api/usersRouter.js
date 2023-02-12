const express = require('express');
const router = express.Router();

const { schemaAddUser } = require('../../schemas/validateshemasUser.js');
const { validateUser } = require('../../middlewares/validateUser');
const { controllerSingUpUser } = require('../../controllers/users');

router.post('/users/signup', validateUser(schemaAddUser), controllerSingUpUser);

module.exports = router;
