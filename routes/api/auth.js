const express = require('express');

const controller = require("../../controllers/auth");

const { controllerWrapper } = require("../../helpers");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/users");

const router = express.Router();

//signup
router.post("/signup", validateBody(schemas.signupSchema), controllerWrapper(controller.signup));

//login
router.post("/login", validateBody(schemas.loginSchema), controllerWrapper(controller.login));

//current
router.get("/current", authenticate, controllerWrapper(controller.getCurrent));

//logout
router.post("/logout", authenticate, controllerWrapper(controller.logout));

//change avatar
router.patch("/avatars", authenticate, upload.single("avatar"), controllerWrapper(controller.updateAvatar));

module.exports = router;
