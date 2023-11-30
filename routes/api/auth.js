const express = require("express");
const router = express.Router();
const { validateBody, authenticate, upload } = require("../../middelwars");
const { schema } = require("../../utils/validation/authValidationSchemas");
const ctrl = require("../../controler/auth");

router.post("/register", validateBody(schema.registerSchema), ctrl.regiser);
router.post("/login", validateBody(schema.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);
module.exports = router;
