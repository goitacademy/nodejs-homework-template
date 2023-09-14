const express = require("express");
const router = express.Router();

const {
	signUpUser,
	loginUser,
	logoutUser,
	getCurrentUser,
	auth,
} = require("../controller/user");

router.post("/signup", signUpUser);

router.post("/login", loginUser);

router.post("/logout", auth, logoutUser);

router.get("/current", auth, getCurrentUser);

module.exports = router;
