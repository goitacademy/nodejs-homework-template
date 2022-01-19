const express = require('express');
const router = express.Router();
const {validateSignup, validateLogin} = require('../middlewares/validation')
const {currentUser,loginUser,logoutUser,signupUser} = require('../controllers');
const guard = require('../middlewares/guard');

router.post('/signup', validateSignup,signupUser);

router.post('/login', validateLogin, loginUser);

router.get('/logout', guard,logoutUser);

router.get('/current', guard,currentUser);


module.exports= router;