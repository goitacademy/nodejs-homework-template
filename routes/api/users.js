const express = require('express');

const { joiUserSchema } = require('../../models');
const { validateBody } = require('../../middlewares/validation');

const usersControllers = require('../../controllers/users');

const router = express.Router();

router.post('/signup', validateBody(joiUserSchema), usersControllers.signUp);

module.exports = router;