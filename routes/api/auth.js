const express = require('express');
const authControllerRegister = require('../../controllers/authController');

const router = express.Router();


router.post('/register', authControllerRegister)

// router.post('/users/login', authControllerLogin)




module.exports = router
