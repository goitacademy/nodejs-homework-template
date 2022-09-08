const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/usersAuth");
const { ctrlWrapper } = require("../../utils");
const { auth, resize, upload } = require("../../middlewares");

router.post("/signup", ctrlWrapper(ctrl.register));

router.post("/login", ctrlWrapper(ctrl.login));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/current", auth, ctrlWrapper(ctrl.listCurrent));

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  resize,
  ctrlWrapper(ctrl.setAvatar)
);

module.exports = router;
