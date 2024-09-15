const express = require("express");
const router = express.Router();
const ctrlUser = require("../../controller/users");

router.post("/signup", ctrlUser.signup);

router.post("/login", ctrlUser.login);

router.post("/logout", ctrlUser.auth, ctrlUser.logout);

router.get("/current", ctrlUser.auth, ctrlUser.current);

router.patch(
  "/avatars",
  ctrlUser.auth,
  ctrlUser.upload.single("avatar"),
  ctrlUser.avatars
);

router.get("/verify/:verificationToken", ctrlUser.verify);

router.post("/verify", ctrlUser.recheckUser);

module.exports = router;
