const express = require('express');
const { schemaCreate } = require('../../models/schemas/user');
const {validateRequest} = require('../../middlewares/validateRequest');
const ctrlAuth = require('../../controller/auth.js');

const router = express.Router();

router.post('/signup', validateRequest(schemaCreate), ctrlAuth.signup);
router.post('/login', validateRequest(schemaCreate), ctrlAuth.login);
router.post('/logout', validateRequest(schemaCreate), ctrlAuth.logout);

module.exports = router