const express = require("express");
const router = express.Router();

const { validation, authorization, upload } = require("../../middlewares");
const { userSchemas } = require("../../models");

const { auth: ctrl, user } = require("../../controllers");

router.post("/signup", validation(userSchemas.joiRegisterSchema), ctrl.signUp);

router.post("/login", validation(userSchemas.joiLoginSchema), ctrl.login);

router.get("/current", authorization, user.currentUser);

router.get("/logout", authorization, ctrl.logout);

router.patch("/subscriprtion", authorization, user.updateSubscription);

router.patch(
  "/avatars",
  authorization,
  upload.single("avatar"),
  user.updateAvatar
);

module.exports = router;