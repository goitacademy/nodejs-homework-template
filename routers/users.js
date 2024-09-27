const express = require('express');
const UserController = require('../controllers/user.js');
const { userMiddleware } = require('../middlewares/user.js');

const router = express.Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.use(userMiddleware);
router.get('/logout', UserController.logout);

module.exports = router;
