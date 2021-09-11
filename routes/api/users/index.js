const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/users");
const guard = require("../../../helpers/guard");

const { validationAutUser } = require("./validation");

router.post("/signup", validationAutUser, ctrl.signup);
router.post("/login", validationAutUser, ctrl.login);
router.post("/logout", guard, ctrl.logout);
router.get("/current", guard, ctrl.current);

module.exports = router;
