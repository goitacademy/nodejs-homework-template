const express = require("express");

const { validateUser, protect } = require("../../middlewares");

const validateSubscription = require('../../middlewares/validateSubscription')

const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
} = require("../../controllers");

const router = express.Router();

router.post("/register", validateUser(), register);
router.post("/login", validateUser(), login);
router.get("/current", protect, getCurrent);
router.post("/logout", protect, logout);
router.patch("/", protect, validateSubscription(), updateSubscription);



module.exports = router;
