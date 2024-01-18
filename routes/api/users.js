const express = require("express");
const { userControllers } = require("../../controllers");
const {
  validateBody,
  authenticate,
  upload,
  resizeAvatar,
  isFile,
} = require("../../middlewares");
const { userSchemas } = require("../../models");
// const { HttpError } = require("../../helpers");

const router = express.Router();

router.post(
  "/register",
  validateBody(userSchemas.registerSchema),
  userControllers.register
);

router.post(
  "/login",
  validateBody(userSchemas.loginSchema),
  userControllers.login
);

router.post("/logout", authenticate, userControllers.logout);

router.get("/current", authenticate, userControllers.getCurrent);

router.patch(
  "/",
  authenticate,
  validateBody(userSchemas.subscriptionUserSchema),
  userControllers.changeSubscription
);

// router.patch(
//   "/avatars",
//   authenticate,
//   upload.single("avatar"),
//   (req, res, next) => {
//     next(req.file ? null : HttpError(400, 'Add file!'));
//   },
//   (req, res, next) => {
//     next();
//   },
//   resizeAvatar,
//   userControllers.updateAvatar
// );
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  isFile,
  resizeAvatar,
  userControllers.updateAvatar
);


module.exports = router;