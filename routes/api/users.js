const express = require("express");
const router = express.Router();

const usersCTRL = require("../../controllers/users")

const authenticate = require("../../helpers/authenticate");

router.post("/register", usersCTRL.userRegistration );

router.get("/login", usersCTRL.userLogin );

router.post("/logout", authenticate, usersCTRL.userLogout);

router.get("/current", authenticate, usersCTRL.userCurrent);

module.exports = router;
