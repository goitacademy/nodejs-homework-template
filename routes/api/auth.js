const express = require("express");
// const multer = require("multer");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers/ctrlWrapper");
const { schemas } = require("../../service/schemasAuth");
const { auth: ctrl } = require("../../controllers");
const { authenticate } = require("../../middleware");
// const upload = multer({ dest: "../../tmp" });

router.post(
  "/register",
  schemas.userValidation,
  ctrlWrapper(ctrl.registerUser)
);
router.post("/login", schemas.loginValidation, ctrlWrapper(ctrl.loginUser));
router.get("/logout", authenticate, ctrlWrapper(ctrl.logoutUser));
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrentUser));
router.patch(
  "/",
  authenticate,
  schemas.subscriptionValidation,
  ctrlWrapper(ctrl.updateSubscription)
);
// router.patch(
//   "/avatars",
//   authenticate,
//   // schemas.avatarValidation,

//   upload.single("avatar"),
//   function (req, res, next) {
//     res.status(200).json({
//       code: 200,
//       status: "success",
//       avatarURL: req.file,
//     });
//     // console.log(req.body);
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
//   }
//   // ctrlWrapper(ctrl.updateAvatar)
// );
module.exports = router;
