const express = require("express");

const router = express.Router();
const ctrl = require("../../Controllers/auth");

const { validateUser, validateToken, upload } = require("../../Middlewares");

const { schemas } = require("../../Service/schemas/users");


router.post("/register",   validateUser(schemas.registerSchema), ctrl.register);

router.get("/login",
  validateUser(schemas.loginSchema),
  ctrl.login);

router.post("/logout",  validateToken, ctrl.logout);

router.get("/current", validateToken, ctrl.currentUser);

router.patch("/subscription",  validateToken,  ctrl.updateSubscription);

router.patch("/avatars", validateToken, upload.single("avatarUrl"), ctrl.updateAvatar);
  
module.exports = router;
