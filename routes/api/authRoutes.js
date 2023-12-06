const express = require('express');
const AuthController = require('../../controllers/authControllers');
const auth = require('../../middlewares/auth');

const router = express.Router();
const jsonParser = express.json();

router.post('/register', jsonParser, AuthController.register);
router.post('/login', jsonParser, AuthController.login);
router.post('/logout', auth, AuthController.logout);
router.get('/current', auth, AuthController.getCurrent);
router.get('/verify/:token', AuthController.verify);

module.exports = router;