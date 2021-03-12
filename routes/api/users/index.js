const express = require("express");
const router = express.Router();
const usersController = require("../../../controllers/usersController");
const validate = require("./validation.js");
const guard = require("../../../helpers/guard");

router.post("/auth/register", validate.userRegistation, usersController.reg);
router.post("/auth/login", validate.userLogin, usersController.login);
router.post("/auth/logout", guard, usersController.logout);

module.exports = router;
