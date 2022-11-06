const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersCtrl");
const validation = require("../../middlewares/usersValidation");
// const auth = require("../../middlewares/auth");

router.post("/signup", validation.userRegistration, usersController.registerUser);
router.post("/login", validation.userLogin, usersController.loginUser);
// router.post("/logout", auth, usersController.logoutUser);
// router.get("/current", auth, usersController.authenticateUser);

module.exports = router;