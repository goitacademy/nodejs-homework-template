const express = require('express');
const router = express.Router();

const { schemaAddUser } = require('../../schemas/validateshemasUser.js');
const { validateUser } = require('../../middlewares/validateUser');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const {
  controllerSingUpUser,
  controllerLoginUser,
  controllerLogoutUser,
} = require('../../controllers/users');

router.post('/users/signup', validateUser(schemaAddUser), controllerSingUpUser);
router.post('/users/login', validateUser(schemaAddUser), controllerLoginUser);
router.get('/users/logout', authMiddleware, controllerLogoutUser);

module.exports = router;
