const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersCtrl");
const validation = require("../../middlewares/usersValidation");

router.post("/signup", validation.userRegistration, usersController.registerUser);
router.post("/login", validation.userLogin, usersController.loginUser);
router.get("/logout", usersController.logoutUser);
router.get("/current", usersController.authenticateUser);

module.exports = router;