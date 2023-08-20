const express = require("express");
const router = express.Router();
const authController = require("../../controller/auth.controller")

router.post('/api/users/signup', authController.signup);
router.post('/api/users/login', authController.login);