const express = require("express");
const router = express.Router();
const userController = require("../../../controllers/user-controller");
const validate = require("./validation");
const guard = require("../../../helpers/guard");
const upload = require("../../../helpers/upload");

router.post("/registration", validate.regUser, userController.reg);
router.post("/login", validate.loginUser, userController.login);
router.post("/logout", guard, userController.logout);

router.get("/current", guard, userController.userCurrent);

router.patch("/avatar", upload.single("avatar"), guard, userController.avatars);

module.exports = router;
