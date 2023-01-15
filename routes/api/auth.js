const express = require('express');

const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require('../../helpers');

const { validateBody, authenticate, upload } = require('../../middlewares');

const { schemas } = require('../../models/user');

const router = express.Router();

// signup
router.post("/register", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verify));

// signin
router.post("/login", validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch("/:id/updSubscription", authenticate, validateBody(schemas.updSubscrSchema), ctrlWrapper(ctrl.updSubscription));

router.patch("/avatar", authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;