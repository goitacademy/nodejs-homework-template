const express = require("express");
const router = express.Router();
const {
  singUpCtrl,
  singInCtrl,
  singOutCtrl,
  currentUserCtrl,
  subscriptCtrl,
} = require("../../controller/auth");

const {schemaPost, schemaPatch} = require("../../schema/userValidation");
const {validatorBody} = require("../../middleware/validBody");
const authen = require("../../middleware/auth");
const {wrapper} = require("../../helpers/tryCatch");

router.post("/singup", validatorBody(schemaPost), wrapper(singUpCtrl));

router.post("/login", validatorBody(schemaPost), wrapper(singInCtrl));

router.get("/logout", authen, wrapper(singOutCtrl));

router.get("/current", authen, wrapper(currentUserCtrl));

router.patch(
  "/subscription",
  authen,
  validatorBody(schemaPatch),
  wrapper(subscriptCtrl)
);

module.exports = router;
