const express = require("express");
const {validation, ctrlWrapper, authenticate} = require('../../middlewares');
const {userSchema} = require('../../schemas');
const {auth:ctrl} = require('../../controllers');
const {upload} = require('../../middlewares');

const router = express.Router();

// signup
router.post("/register", validation(userSchema.register), ctrlWrapper(ctrl.register));

// signin
router.post("/login", validation(userSchema.login), ctrlWrapper(ctrl.login));

// signout
router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.patch("/subscription", authenticate, validation(userSchema.subscriprion), ctrlWrapper(ctrl.updateSubscription));

router.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));


module.exports = router;
