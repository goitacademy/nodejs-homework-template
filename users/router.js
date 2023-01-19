const express = require("express");
const userMiddleware = require("../middlewares/user");

const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  updateSubscription,
} = require("./controllers");

const router = express.Router();

router.get("/login", loginUser);
router.post("/signup", registerUser);
router.post("/logout", userMiddleware, logoutUser);

router.get("/current", userMiddleware, getCurrentUser);
router.patch("/", userMiddleware, updateSubscription);

module.exports = router;
