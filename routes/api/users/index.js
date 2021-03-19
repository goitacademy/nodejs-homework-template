const express = require("express");
const router = express.Router();
const validate = require("./validation");
const userController = require("../../../controllers/users");
const guard = require("../../../helpers/guard");
const upload = require("../../../helpers/upload");
const { validateUploadAvatar } = require("./validation");

router.post("/registration", validate.createUser, userController.reg);
router.post("/login", validate.loginUser, userController.login);
router.post("/logout", guard, userController.logout);
router.get("/current", guard, userController.current);
router.patch(
  "/avatars",
  [guard, upload.single("avatar"), validateUploadAvatar],
  userController.avatars
);

router.patch(
  "/sub",
  guard,
  validate.updateSubscription,
  userController.updateSubsription
);

module.exports = router;
