const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users');
const userTokenMiddleware = require('../../middlewares/userToken');

router.post('/register', userTokenMiddleware,userController.registerUser);
router.post('/login', userTokenMiddleware,userController.loginUser);
router.post('/logout', userTokenMiddleware, userController.logoutUser);
router.get('/current', userTokenMiddleware, userController.getCurrentUser);

module.exports = router;