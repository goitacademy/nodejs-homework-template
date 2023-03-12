const express = require("express");
const { validateBody, authenticate, isValidId, upload} = require("../../middlewares");
const {authCntr} = require("../../controllers/")
const { schemas } = require("../../model/user");


const { login, register, getCurrent, logout, subscription, updateAvatar } = authCntr;

console.log(updateAvatar)

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);

router.post("/login", validateBody(schemas.loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch("/:id/subscription", authenticate, isValidId, validateBody(schemas.updateSubscriptionJoiSchema), subscription)

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar)

module.exports = router;