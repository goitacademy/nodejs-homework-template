const express = require("express");
const router = express.Router();
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");
const {auth:ctrl}   = require("../../controllers");
const {auth, validation, ctrlWrapper } = require("../../middlewares");

 
router.post("/register", validation(joiRegisterSchema), ctrlWrapper(ctrl.register));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login))

router.post("/logout", auth, ctrlWrapper(ctrl.logout))


module.exports = router;