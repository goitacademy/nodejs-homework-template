const express=require('express');
const router = express.Router();
const {registration,login,logout, currentUser} = require('../../controller/authController/index')
// const auth= require('../../middlewares/auth')


router.post('/users/signup',  registration)

router.post('/users/login', login)

router.post('/users/logout',logout )

router.post('/users/current',currentUser )
module.exports = router;



