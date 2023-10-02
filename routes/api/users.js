const express = require('express');
const {registerUser, loginUser, currentUser, logoutUser, updateAvatar} = require('../../controllers/users');
const { checkCreateUserData, auth, upload } = require('../../middlewares/userMiddlewares');

const router = express.Router();

router.post('/register', checkCreateUserData, registerUser);

router.post('/login', checkCreateUserData, loginUser);

router.get('/current', auth, currentUser);

router.post('/logout', auth, logoutUser);

router.patch('/avatars', auth, upload.single("avatar"), updateAvatar );

module.exports = router