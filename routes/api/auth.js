const express = require("express");
const ctrl = require("../../controllers/auth");
const { validation, authMiddlewar } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(schemas.register), ctrl.register);

router.post("/signin", validation(schemas.register), ctrl.login);

router.get("/current", authMiddlewar, ctrl.getCurrent);

router.get("/logout", authMiddlewar, ctrl.logOut);

module.exports = router;
