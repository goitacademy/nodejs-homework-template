const express = require('express');
const router = express.Router();
const { controllerSingUpUser } = require('../../controllers/users');

router.post('/users/signup', controllerSingUpUser);

module.exports = router;
