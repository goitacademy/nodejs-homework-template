const express = require("express");
const auth = require("../../controller/authController");
const {
  schemaPasswordValidation,
} = require("../../service/schema/validationSchemas");
const { validateSchema } = require("../../middlewares/SchemaValidator");
const { authMiddleware } = require("../../middlewares/authMiddlware");
const { asyncWrapper } = require("../../helpers/apiHelper");
const { upload } = require("../../helpers/fileUpload");
const router = express.Router();

router.post(
  "/signup",
  validateSchema(schemaPasswordValidation),
  asyncWrapper(auth.signupController)
);

router.post(
  "/login",
  validateSchema(schemaPasswordValidation),
  asyncWrapper(auth.singinController)
);

router.post("/logout", authMiddleware, asyncWrapper(auth.logoutController));

router.get(
  "/current",
  authMiddleware,
  asyncWrapper(auth.currentUserController)
);

router.patch(
  "/avatars",
  authMiddleware,
  upload.single("avatar"),
  asyncWrapper(auth.updateAvatar)
);

router.use("/download", express.static('/public/avatars'));
module.exports = router;
