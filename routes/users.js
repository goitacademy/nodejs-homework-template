const express = require("express");
const { users } = require("../controllers");
const { joiRegisterSchema, joiLoginSchema } = require("../models");
const validation = require("../middlewares/validation");
const checkAuthMiddleware = require("../middlewares/checkAuthMiddleware");
const { upload } = require("../middlewares");

const router = express.Router();

router.route("/register").post(validation(joiRegisterSchema), users.register);
router.route("/login").post(validation(joiLoginSchema), users.login);
router.route("/current").get(checkAuthMiddleware, users.getCurrent);
router.route("/logout").post(checkAuthMiddleware, users.logout);
router
  .route("/avatars")
  .patch(checkAuthMiddleware, upload.single("avatar"), users.updateAvatar);

module.exports = router;
