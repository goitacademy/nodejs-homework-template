const express = require("express");
const userCtrl = require('../../controllers/users');
const { validateBody } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

router.post("/register", validateBody(schemas.signup), userCtrl.signup);
router.post("/login", validateBody(schemas.signin), userCtrl.signin);
router.get("/current", userCtrl.signin);
router.get("/logout", userCtrl.logout);

module.exports = router;
