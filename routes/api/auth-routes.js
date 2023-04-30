const express = require("express");
const router = express.Router();
const authentificate = require("../../middlewares/authentificate");
const upload = require("../../middlewares/upload");
const { schemas } = require("../../models/user");
const { validateRegister, validateBody } = require("../../utils/validateBody");
const authController = require("../../controllers/auth-controllers");

router.post("/register", validateRegister(schemas.userRegisterSchema), authController.register);
router.post("/login", validateRegister(schemas.userLoginSchema), authController.login);
router.get("/current", authentificate, authController.getCurrent);
router.post("/logout", authentificate, authController.logout);
router.patch("/subscription", authentificate, validateBody(schemas.userSubscriptionShema), authController.updateSubcription);
router.patch("/avatars", authentificate, upload.single("avatar"), authController.updateAvatar);
module.exports = router;
