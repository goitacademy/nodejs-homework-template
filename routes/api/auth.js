const express = require("express");
const userCtrl = require('../../controllers/users');
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require('../../models/user');

const router = express.Router();

router.post("/register", validateBody(schemas.signup), userCtrl.signup);
router.post("/login", validateBody(schemas.signin), userCtrl.signin);
router.get("/current", authenticate, userCtrl.signin);
router.get("/logout", authenticate, userCtrl.logout);

module.exports = router;
