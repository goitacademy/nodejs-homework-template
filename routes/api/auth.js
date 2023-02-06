const express = require("express");
const router = express.Router();

const { validation, authorization } = require("../../middlewares");
const { userSchemas } = require("../../models");

const { auth: ctrl, user } = require("../../controllers");

router.post("/signup", validation(userSchemas.joiRegisterSchema), ctrl.signUp);

router.post("/login", validation(userSchemas.joiLoginSchema), ctrl.login);

router.get("/current", authorization, user.currentUser);

router.get("/logout", authorization, ctrl.logout);

router.patch("/", authorization, user.updateSubscription);

module.exports = router;