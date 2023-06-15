const express = require("express");
const {
  signup,
  login,
  updateSubscription,
  logout,
  getCurrentUser,
} = require("../../controllers/usersController");
const authMiddleware = require("../../middlewares/authMiddleware");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.patch("/:id/subscription", updateSubscription);
router.get("/logout", logout);
router.get("/current", authMiddleware, getCurrentUser);

module.exports = router;
