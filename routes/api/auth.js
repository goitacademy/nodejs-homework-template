const express = require("express");

const AuthController = require("../../controllers/auth");

const authMiddleware = require("../../middlewares/auth");


const router = express.Router();


router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

router.get("/logout", authMiddleware, AuthController.logout);

router.get("/current", authMiddleware, AuthController.getCurrent);
module.exports = router;
