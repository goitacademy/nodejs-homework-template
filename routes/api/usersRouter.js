const express = require('express');
const router = express.Router();

const { schemaAddUser } = require('../../schemas/validateshemasUser.js');
const { validateUser } = require('../../middlewares/validateUser');
const {
  controllerSingUpUser,
  controllerLoginUser,
} = require('../../controllers/users');

router.post('/users/signup', validateUser(schemaAddUser), controllerSingUpUser);
router.post('/users/login', controllerLoginUser);

module.exports = router;
