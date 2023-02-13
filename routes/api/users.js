const express = require("express");
const userController = require("../../controller/users.js");
const { validateData } = require("../../middlewares/validator.js");
const { userValidate } = require("../../utils/validator.js");
const { auth } = require("../../middlewares/authorizationJwt.js");

const router = express.Router();

router.post("/signup", validateData(userValidate), userController.register);

router.post("/login", validateData(userValidate), userController.login);

router.get("/logout", auth, userController.logout);

router.get("/current", auth, userController.current);

module.exports = router;
