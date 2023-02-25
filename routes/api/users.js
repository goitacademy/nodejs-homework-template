const express = require("express");
const asyncHandler = require("express-async-handler");
const { addUserValidation, auth } = require("../../middlevares");
const { register, login, logout } = require("../../controllers");

const router = express.Router();

router.post("/register", addUserValidation, asyncHandler(register));
router.post("/login", addUserValidation, asyncHandler(login));
router.get("/logout", auth, asyncHandler(logout));

module.exports = router;
