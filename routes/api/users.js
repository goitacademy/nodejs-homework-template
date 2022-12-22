const express = require("express");
const { validation, ctrlWrapper, auth, upload } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { joiRegisterSchema, joiPatchSchema } = require("../../models/user");
const router = express.Router();

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);
router.post("/login", validation(joiRegisterSchema), ctrlWrapper(ctrl.login));

router.get("/current", ctrlWrapper(auth), ctrlWrapper(ctrl.getCurrent));

router.get("/logout", ctrlWrapper(auth), ctrlWrapper(ctrl.logout));
router.patch(
  "/",
  validation(joiPatchSchema),
  ctrlWrapper(auth),
  ctrlWrapper(ctrl.updateSub)
);
router.patch(
  "/avatars",
  ctrlWrapper(auth),
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
module.exports = router;
