const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const authMiddleware = require('../../middleware/authMiddleware');

router.post('/signup', usersController.signup);
router.post('/login', usersController.login);
router.get('/current', authMiddleware, usersController.getCurrent);

module.exports = router;
