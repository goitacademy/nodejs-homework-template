const { Router } = require('express');

const { signup, login } = require('../../controllers/auth');
const { checkSignupUserData } = require('../../middlewares/auth');

const router = Router();

// signup - register new user
router.post('/signup', checkSignupUserData, signup);

// login - login user - authentification
router.post('/login', login);

module.exports = router;
