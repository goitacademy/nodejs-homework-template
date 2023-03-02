const express=require('express');
const router = express.Router();
const AuthController = require('../../controller/authController/authController')

router.post('/registration', AuthController.registration)

router.post('/login', AuthController.login)
// router.post('/pasword', AuthController.password)


module.exports = router;
