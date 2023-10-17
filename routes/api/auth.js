const express = require("express");

const {
  register,
  login,
  getCurrent,
  logout,
} = require("../../controllers/auth");
const authenticate = require("../../middlewares/authenticate");
const { updateSubscription } = require("../../controllers/userController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);
router.patch("/:id", authenticate, updateSubscription);

module.exports = router;
