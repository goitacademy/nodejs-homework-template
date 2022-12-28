const express = require('express');

const { ctrlWrappers } = require("../../helpers");

const { validateBody, validateId, auth } = require("../../middlewares");

const ctrlAuth = require('../../controllers/authControllers');

const schemasAuth = require('../../schemas/users');

const schemas = require("../../schemas/contacts")

const router = express.Router();

router.post('/register', validateBody(schemasAuth.registerSchema), ctrlWrappers(ctrlAuth.register));

router.post('/login', validateBody(schemasAuth.LoginSchema), ctrlWrappers(ctrlAuth.login));

router.get('/logout', auth, ctrlWrappers(ctrlAuth.logout));



module.exports = router;