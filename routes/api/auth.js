const express = require('express');

const { validateBody, authentificate } = require("../../middlewares");
const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/auth");

const router = express.Router();



router.post("/register", validateBody(schemas.joiUserSchema), ctrl.register);
router.post("/login", validateBody(schemas.joiUserSchema), ctrl.login);
router.post("/current", authentificate, ctrl.getCurrent);
router.post("/logout", authentificate, ctrl.logout);




module.exports = router