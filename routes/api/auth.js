const express = require("express");
const router = express.Router();
const { getCurrent, ctrlWrapper } = require("../../middlewares");

const {
  register,
  login,
  getCurrentUser,
  logout,
  updateSubscription,
} = require("../../controllers");

router.post("/register", ctrlWrapper(register));
router.post("/login", ctrlWrapper(login));
router.get("/current", getCurrent, ctrlWrapper(getCurrentUser));
router.post("/logout", getCurrent, ctrlWrapper(logout));
router.patch("/",getCurrent,ctrlWrapper(updateSubscription))

module.exports = router;
