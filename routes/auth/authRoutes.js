const { Router } = require('express');

const { signup, login, getCurrentUser } = require('../../controllers/auth');
const { checkSignupUserData } = require('../../middlewares/auth');

const router = Router();

// signup - register new user
router.post('/signup', checkSignupUserData, signup);

// login - login user - authentification
router.post('/login', login);

module.exports = router;
// current - get current user
router.get('/current', getCurrentUser);

module.exports = router;
