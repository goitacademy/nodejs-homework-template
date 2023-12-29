const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authentificate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.userRegisterSchema),
  ctrl.register
);

router.post("/login", validateBody(schemas.userRegisterSchema), ctrl.login);

router.get("/current", authentificate, ctrl.getCurrent);

router.post("/logout", authentificate, ctrl.logout);

router.patch(
  "/users/avatars",
  authentificate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
