const express = require("express");
const { basedir } = global;
const { auth, validation, ctrlWrapper } = require(`${basedir}/middlewares`);
const { auth: ctrl } = require(`${basedir}/controllers`);
const { joiRegisterSchema, joiLoginSchema } = require(`${basedir}/models/user`);

const router = express.Router();

router.post(
  "/signup",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.signup)
);

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
