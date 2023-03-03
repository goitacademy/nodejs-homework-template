const express=require('express');
const router = express.Router();
const AuthController = require('../../controller/authController/authController')

router.post('/users/signup', AuthController.registration)

router.post('/users/login', AuthController.login)
// router.post('/pasword', AuthController.password)

router.post('/users/logout',AuthController.logout )
module.exports = router;
