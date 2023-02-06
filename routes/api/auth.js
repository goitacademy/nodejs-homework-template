const express = require("express");
const router = express.Router();
const { validation, ctrlWrapper } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers/");
const { registerJoiSchema, loginJoiSchema } = require("../../models/user");

 router.post("/signup",validation(registerJoiSchema),ctrlWrapper(ctrl.register));
router.post('/login',validation(loginJoiSchema),ctrlWrapper(ctrl.login))
module.exports = router;


