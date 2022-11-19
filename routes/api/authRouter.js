const express = require("express");
const {
  singUpCtrl,
  singInCtrl,
  singOutCtrl,
  currentUserCtrl,
  subscriptCtrl,
} = require("../../controller/auth");

const {check} = require("../../middleWare/auth");
const {wrapper} = require("../../helpers/tryCatch");
const {schemaPost, schemaPatch} = require("../../schema/userValidation");
const {validatorBody} = require("../../middleware/validBody");
const router = express.Router();

router.get("/current", check, wrapper(currentUserCtrl));
router.patch("/", check, subscriptCtrl);
// router.patch("/subscription", check, subscriptCtrl);
router.post("/singup", validatorBody(schemaPost), wrapper(singUpCtrl));
router.get("/login", validatorBody(schemaPost), wrapper(singInCtrl));
router.post("/login", validatorBody(schemaPost), wrapper(singInCtrl));
router.get("/logout", check, wrapper(singOutCtrl));
router.post("/logout", check, wrapper(singOutCtrl));
router.patch(
  "/subscription",
  check,
  validatorBody(schemaPatch),
  wrapper(subscriptCtrl)
);

module.exports = router;
