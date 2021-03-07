const express = require("express");
const router = express.Router();
const userController = require("../../../controllers/user-controller");
const validate = require("./validation");

router.post("/registration", userController.reg);
router.post("./login", userController.login);
router.post("./logout", userController.logout);

module.exports = router;
