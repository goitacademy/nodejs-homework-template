const express = require("express");
const router = express.Router();
const { register, login, authenticateToken, logout, getCurrentUser } = require('../models/users')

// Реєстрація
router.post('/register', register);

// Логін
router.post('/login', login);

// Вихід (логаут)
router.post('/logout', authenticateToken, logout);

// Поточний користувач
router.get('/current', authenticateToken, getCurrentUser);

module.exports = router;
