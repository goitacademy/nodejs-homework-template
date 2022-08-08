const express = require("express");

const { basedir } = global;

const controller = require(`${basedir}/controllers/auth`);

const { ctrlWrapper } = require(`${basedir}/helpers`);

const { auth, upload } = require(`${basedir}/middlewares`);

const router = express.Router();

// signup
router.post("/register", ctrlWrapper(controller.register));

router.post("/login", ctrlWrapper(controller.login));

router.get("current", auth, ctrlWrapper(controller.getCurrent));

router.get("logout", auth, ctrlWrapper(controller.logout));

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(controller.setAvatar)
);

module.exports = router;
