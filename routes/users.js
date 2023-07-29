const express = require("express");
const {validateBody, authenticate, upload} = require("../middlewares");
const {schemas} = require("../models/user");
const {register, login, logout, getUsersData, updateSubscription, updateAvatar} = require("../controllers/users");

const router = express.Router();

router.post('/register', upload.single("avatarURL"), validateBody(schemas.registerSchema), register);
router.post('/login', validateBody(schemas.loginSchema), login);
router.post('/logout', authenticate, logout);
router.get('/current', authenticate, getUsersData);
router.patch('/', authenticate, validateBody(schemas.subscriptionSchema), updateSubscription);
router.patch('/avatars', authenticate, upload.single("avatarURL"), updateAvatar);               

module.exports = router;