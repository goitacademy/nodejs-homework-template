const express = require('express');
const { checkAuthUser, protectToken } = require('../../middlewares/authMiddleware');
const { registerUser, loggedUser, logoutUser, getCurrentUser } = require('../../controller/usersController');



const router = express.Router();

router
    .route('/register')
    .post(checkAuthUser, registerUser)

router
    .route('/login')
    .post(checkAuthUser, loggedUser)

router.use(protectToken)


router
    .route('/logout')
    .post(logoutUser)

router
    .route('/current')
    .get(getCurrentUser)

module.exports = router