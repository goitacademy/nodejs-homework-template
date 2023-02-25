const express = require("express");
const asyncHandler = require("express-async-handler");
const { addUserValidation, auth } = require("../../middlevares");
const { register, login, logout, currentUser } = require("../../controllers");

const router = express.Router();

router.post("/register", addUserValidation, asyncHandler(register));
router.post("/login", addUserValidation, asyncHandler(login));
router.get("/logout", auth, asyncHandler(logout));
router.get("/current", auth, asyncHandler(currentUser));

module.exports = router;
