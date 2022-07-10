const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { auth, validation, upload } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { userSignupSchema, userLoginSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(userSignupSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(userLoginSchema), ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrentUser));
router.post("/avatars", upload.single("avatar"), ctrlWrapper(ctrl.avatars));
// router.get("/avatars", async (req, res) => {
//   res.json();
// });
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
