const express = require("express");
const {
    validateBody,
    authenticate,
    upload,

} = require("../../middlewares");
const ctrl = require('../../controllers/users')


const {schemas} = require("../../models/user")

const router = express.Router()


router.post("/register", validateBody(schemas.registerSchema), ctrl.register)

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/verify", validateBody(schemas.mailSchema), ctrl.resendVerifyEmail); //повторний лист підтвердження на емейл

router.post("/login", validateBody(schemas.loginSchema), ctrl.login)

router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);

 //додаткове завдання hw-04 Оновлення підписки (subscription)
router.patch("/", authenticate, validateBody(schemas.updateSubscriptionSchema), ctrl.updateSubscription)

router.patch("/avatars",authenticate,upload.single("avatar"),ctrl.updateAvatar)


module.exports = router;