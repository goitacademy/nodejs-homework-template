const express = require("express");

const {
  validation,
  controllerWrapper,
  authenticate,
  upload,
} = require("../../../middlewares");
const {
  register,
  login,
  logout,
  current,
  updateImage,
} = require("../../../controllers/auth");
const { joiSchema } = require("../../../models/user");

const router = express.Router();

router.post("/signup", validation(joiSchema), controllerWrapper(register));
router.post("/login", validation(joiSchema), controllerWrapper(login));
router.get("/logout", authenticate, controllerWrapper(logout));
router.get("/current", authenticate, controllerWrapper(current));
router.patch(
  "/avatars",
  authenticate,
  upload.single("image"),
  controllerWrapper(updateImage)
);

module.exports = router;
