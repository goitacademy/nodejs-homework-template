const express = require('express');

const { joiUserSchema } = require('../../models');
const { validateBody, ctrlWrapper } = require('../../middlewares');

const usersControllers = require('../../controllers/users');

const router = express.Router();

router.post('/signup', validateBody(joiUserSchema), ctrlWrapper(usersControllers.signUp));

module.exports = router;