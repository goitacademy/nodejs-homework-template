const express = require('express');

const ctrlUser = require('../../controllers/users');
const { validateBody, authenticate } = require('../../middlewares');
const schemas = require('../../schemas/users');

const router = express.Router();

router.post('/register', validateBody(schemas.userSchema), ctrlUser.register);

router.post('/login', validateBody(schemas.userSchema), ctrlUser.login);

router.post('/logout', authenticate, ctrlUser.logout);

router.get('/current', authenticate, ctrlUser.getCurrent);

module.exports = router;
