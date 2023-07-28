const express = require("express");

const {
    ctrlRegister,
    ctrlLogin,
    ctrlGetCurrent,
    ctrlLogout,
} = require("../../controllers/auth");

const { validateBody } = require("../../decorators");

const { authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
    "/register",
    validateBody(schemas.registerShema),
    ctrlRegister.register
);

router.post("/login", validateBody(schemas.loginShema), ctrlLogin.login);

router.get("/current", authenticate, ctrlGetCurrent.getCurrent);

router.post("/logout", authenticate, ctrlLogout.logout);

module.exports = router;