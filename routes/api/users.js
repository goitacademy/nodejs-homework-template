const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersCtrl");
const validation = require("../../middlewares/usersValidation");
const authMiddleware = require("../../middlewares/auth");

router.post("/signup", validation.userRegistration, usersController.registerUser);
router.post("/login", validation.userLogin, usersController.loginUser);
router.get("/logout", authMiddleware, usersController.logoutUser);
router.get("/current", authMiddleware, usersController.getCurrentUser);
router.patch("/", authMiddleware, validation.userSubscription, usersController.subscribeUser);

module.exports = router;