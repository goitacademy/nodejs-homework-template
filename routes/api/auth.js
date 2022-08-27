const express = require("express");

const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers/ctrlWrapper");

const { validationBody } = require("../../middlewares/validationBody");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validationBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

module.exports = router;
