const express = require("express");
const { validateBody, authenticate, upload } = require("../../middlewarse");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");
// const multer = require("multer");

// const path = require("path");
// const fs = require("fs/promises");

// const avatarsDir = path.join(__dirname, "../../temp");

// const multerConfig = multer.diskStorage({
//   destination: avatarsDir,
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: multerConfig,
// });

const router = express.Router();

// const avatarDir = path.join(__dirname, "../../public/avatars");

// router.post(
//   "/avatar",
//   authenticate,

//   upload.single("avatar"),

//   async (req, res) => {
//     console.log(req.file);
//     const { path: tempUpload, originalname } = req.file;

//     const resultUpload = path.join(avatarDir, originalname);
//     await fs.rename(tempUpload, resultUpload);
//     res.json("Well done!");
//   }
// );

router.post(
  "/register",
  validateBody.validateBodyPost(schemas.registerSchema),
  ctrl.register
);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/verify",
  validateBody.validateBodyPost(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

router.post(
  "/login",
  validateBody.validateBodyPost(schemas.loginSchema),
  ctrl.login
);

router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch(
  "/subscription",
  authenticate,
  validateBody.validateUsersPatch(schemas.updateSubscriptionUser),
  ctrl.updateSubscriptionUser
);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
