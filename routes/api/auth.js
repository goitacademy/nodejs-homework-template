const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers/auth.controller");

const { validationBody } = require("../../middlewares/validationBody.js");
const validationToken = require("../../middlewares/validationToken.js");
const upload = require("../../middlewares/upload.js");
const { schemaAuth, schemaEmail } = require("../../schema/validationSchema");

const { asyncWrapper } = require("../../helpers/api.helpers");

router.post("/signup", validationBody(schemaAuth), asyncWrapper(register));
router.post("/login", validationBody(schemaAuth), asyncWrapper(login));
router.get("/current", validationToken, asyncWrapper(getCurrent));
router.get("/logout", validationToken, asyncWrapper(logout));
router.patch(
  "/avatars",
  validationToken,
  upload.single("avatar"),
  asyncWrapper(updateAvatar)
);
router.get("/verify/:verificationToken", asyncWrapper(verifyEmail));
router.post(
  "/verify",
  validationBody(schemaEmail),
  asyncWrapper(resendVerifyEmail)
);

module.exports = router;
