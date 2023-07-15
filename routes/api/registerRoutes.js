const { Router } = require('express');

const registerController = require('../../controllers/registerController');
const { checkSignup, authMiddleware } = require('../../middlewares/authMiddleware');

const router = Router();

router.post('/register', checkSignup, registerController.signup);
router.post('/login', registerController.login);
router.post('/logout', authMiddleware, registerController.logout);
router.post('/current', authMiddleware, registerController.getCurrentUser);

module.exports = router;
