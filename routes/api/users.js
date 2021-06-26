const express = require('express');
const router = express.Router();
const guard = require('../../helpers/guard');

const userControlers = require('../../controllers/userControllers');

router.post('/registration', userControlers.reg);
router.post('/login', userControlers.login);
router.post('/logout', guard, userControlers.logout);
router.get('/current', guard, userControlers.getCurrentUser);

module.exports = router;
