const express = require('express');
const {registerUser, loginUser, currentUser, logoutUser} = require('../../controllers/users');
const { checkCreateUserData, auth } = require('../../middlewares/userMiddlewares');

const router = express.Router();

router.post('/register', checkCreateUserData, registerUser);

router.post('/login', checkCreateUserData, loginUser);

router.get('/current', auth, currentUser);

router.post('/logout', auth, logoutUser)

module.exports = router