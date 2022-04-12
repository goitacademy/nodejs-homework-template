const express = require("express");
const router = express.Router();

const { register, login, logout } = require("../../../controllers/auth");
const { wrapper: wrapperError } = require("../../../middleware/error-handler");

router.post("/register", wrapperError(register));
router.post("/login", wrapperError(login));
router.post("/logout", wrapperError(logout));

module.exports = router;
