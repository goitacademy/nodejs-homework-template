const express = require("express");
const router = express.Router();
const guard = require("../../helpers/guard");
const {
  userSingupControler,
  userLoginControler,
  userLogoutControler,
  getCurrentUserControler,
} = require("../../controlers/userControlers");

router.post("/singup", userSingupControler);
router.post("/login", userLoginControler);
router.post("/logout", guard, userLogoutControler);
router.get("/current", guard, getCurrentUserControler);

module.exports = router;
