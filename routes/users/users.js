const express = require('express');
const {
    registerUser,
    logInUser,
    logOutUser,
    listCurrentUser,
} = require('../../controllers/users/controller');
const auth = require('../../middlewares/auth');

const ctrlWrapper = require('../../helpers/ctrlWrapper');

const router = express.Router();

router.post('/register', ctrlWrapper(registerUser));

router.post('/login', ctrlWrapper(logInUser));

router.post('/logout', auth, ctrlWrapper(logOutUser));

router.get('/current', auth, ctrlWrapper(listCurrentUser));

module.exports = router;
