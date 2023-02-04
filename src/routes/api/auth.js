const express = require("express");
const { auth } = require("../../middlewawes/authMiddlevares");
const { ctrlWrapper } = require("../../helpers/ctrlWrapper");
const {
  signup,
  login,
  logout,
  getCurrent,
  updateSubscription,
} = require("../../controllers/authController");

const router = express.Router();

router.post("/signup", ctrlWrapper(signup));
router.post("/login", ctrlWrapper(login));
router.get("/logout", auth, ctrlWrapper(logout));
router.get("/current", auth, ctrlWrapper(getCurrent));
router.patch("/", auth, ctrlWrapper(updateSubscription));

module.exports = router;
