const express = require("express");
const validateUserSchema = require("../../middlewares/validateUser");
const auth = require("../../middlewares/auth");
const {
  signUp,
  logIn,
  logOut,
  current,
} = require("../../service/controllers/userController");

const router = express.Router();

router.post("/signup", validateUserSchema, signUp);
router.post("/login", validateUserSchema, logIn);
router.get("/logout", auth, logOut);
router.get("/current", auth, current);

module.exports = router;
