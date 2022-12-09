const express = require("express");
const router = express.Router();

const { validation, ctrlWrapper } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiUserSchema } = require("../../models/user");

router.post("/singup", validation(joiUserSchema), ctrlWrapper(ctrl.singUp));
router.post("/singin", validation(joiUserSchema), ctrlWrapper(ctrl.singIn));

module.exports = router;
