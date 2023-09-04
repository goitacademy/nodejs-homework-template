const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const upload = require('../middleware/multer.js');
const signup = require('../controllers/auth/signup.js');
const login = require('../controllers/auth/login.js');
const logout = require('../controllers/auth/logout.js');
const current = require('../controllers/auth/current.js');
const subscriptionUpdate = require('../controllers/auth/subscriptionUpdate.js');
const updateAvatar = require('../controllers/auth/updateAvatar.js');


router.post("/signup", signup);

router.post('/login', login);

router.get('/logout', auth, logout);

router.get('/current', auth, current);

router.patch("/", auth, subscriptionUpdate);

router.patch('/avatars', auth, upload.single('avatar'), updateAvatar);

module.exports = router; 