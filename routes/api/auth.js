const express = require("express");
const {
  register,
  login,
  logout,
  currentUser,
} = require("../../controllers/auth");
const { ctrlWrapper } = require("../../middlewares/middlewares");
const checkAuth = require("../../middlewares/auth");

const router = express.Router();

router.post("/signup", ctrlWrapper(register));
router.post("/login", ctrlWrapper(login));
router.get("/logout", checkAuth, ctrlWrapper(logout));
router.get("/current", checkAuth, ctrlWrapper(currentUser));

module.exports = router;
