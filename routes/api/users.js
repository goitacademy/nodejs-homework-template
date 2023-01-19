const express = require("express");

const {
  controllerWrapper,
  validation,
  auth,
  upload,
} = require("../../middlewares");
const { joiSchema } = require("../../models/user");
const {
  users: { signup, login, getCurrent, logout, updateAvatar },
} = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiSchema), controllerWrapper(signup));
router.post("/login", validation(joiSchema), controllerWrapper(login));
router.get("/current", auth, controllerWrapper(getCurrent));
router.get("/logout", auth, controllerWrapper(logout));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  controllerWrapper(updateAvatar)
);

module.exports = router;
