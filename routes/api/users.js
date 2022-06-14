const express = require('express');

const ctrlUsers = require('../../controller/users');
const { auth } = require('../../middlewares/auth')

const router = express.Router();

router.get('/current', auth, ctrlUsers.get);

module.exports = router