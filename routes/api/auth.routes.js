const express = require("express");
const router = express.Router();
const authController = require("../../controller/auth.controller")

router.post('/users/signup', authController.signup);
router.post('/users/login', authController.login);