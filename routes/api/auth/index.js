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
  verify,
  newVerify,
} = require("../../../controllers/auth");
const { joiSchema } = require("../../../models/user");
// const { verify } = require("jsonwebtoken");

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
router.get("/verify/:verificationToken", controllerWrapper(verify));
router.post("/verify/", controllerWrapper(newVerify));

module.exports = router;
