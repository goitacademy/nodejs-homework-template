const express = require("express");
const { registerController, loginController } = require("../../controllers");

const { asyncWrapper } = require("../../helpers");

const router = express.Router();

router.post("/signup", asyncWrapper(registerController));
router.post("/login", asyncWrapper(loginController));
// router.get("/logout", auth, asyncWrapper(logoutController));

module.exports = router;
