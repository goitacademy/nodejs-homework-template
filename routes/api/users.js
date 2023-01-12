const express = require("express");
const auth = require("../../middleware/auth");

const {
  crtlRegisterUser,
  crtlLoginUser,
  ctrlLogoutUser,
  ctrlCurrentUser,
} = require("../../controllers/users");

const router = express.Router();

router.post("/register", crtlRegisterUser);

router.post("/login", crtlLoginUser);

router.post("/logout", auth, ctrlLogoutUser);

router.get("/current", auth, ctrlCurrentUser);

module.exports = router;
