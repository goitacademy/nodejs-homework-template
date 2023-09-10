const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const { auth } = require("../middlewares/auth");

router.post("/signup", userController.register);
router.post("/login", userController.login);
router.get("/logout", auth, userController.logout);
router.get("/current", auth, userController.current);

module.exports = router;
