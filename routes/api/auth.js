const express = require("express");
// express для маршрутизації
const {validateBody, authenticate, upload} = require("../../middlewares");
const { schemas} = require("../../models");

const {ctrlUser, ctrl} = require("../../controllers")

const router = express.Router();
// створюємо сторінку записної книжки

//singnup
router.post("/register", validateBody(schemas.registerSchema), ctrlUser.register);
//signin
router.post("/login", validateBody(schemas.loginSchema), ctrlUser.login);

router.get("/current", authenticate, ctrlUser.currentUser);

router.post("/logout", authenticate, ctrlUser.logout);

router.patch('/subscription', authenticate, ctrlUser.subscription);

router.patch("/avatars",  authenticate, upload.single("avatar"), ctrlUser.updateAvatar);

module.exports = router;

