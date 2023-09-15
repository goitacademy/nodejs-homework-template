const express = require("express");

const ctrl = require("../../controllers/auth");


const { validateBody, authenticate, upload } = require("../../midlewares");


const { schemas } = require("../../models/user");

const router = express.Router();

// signup
router.post("/register", validateBody(schemas.signUpSchema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("./verify", validateBody(schemas.verifySchema), ctrl.resendVerifyEmail);


// login// signin
router.post("/login", validateBody(schemas.logInSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout)

// шдях до оновлення аватарки
router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);


module.exports = router;