const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/auth")

const { ctrlWrapper } = require("../../helpers");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

router.post("/users/signup", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.post("/users/login", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.login));

router.get("/users/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/users/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch("/users/avatars", authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar))

module.exports = router;