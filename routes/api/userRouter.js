const express = require('express');
const controller = require('../../controllers')
const checkToken = require('../../middlewares/authMiddleware')


const router = express.Router();

// дії з користувачами
router.post('/register', controller.userRegister); // Оновлено шлях до реєстрації
router.post('/login', controller.userLogin)//
router.post('/logout', checkToken, controller.userLogout);


module.exports = router;