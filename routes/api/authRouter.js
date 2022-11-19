const express = require("express");
const {
  singUpCtrl,
  singInCtrl,
  singOutCtrl,
  currentUserCtrl,
  subscriptCtrl,
} = require("../../controller/auth");

const {checkToken } = require("../../middleWare/auth");
const {wrapper} = require("../../helpers/tryCatch");
const {schemaPost, schemaPatch} = require("../../schema/userValidation");
const {validatorBody} = require("../../middleware/validBody");
const router = express.Router();

router.get("/current", checkToken , wrapper(currentUserCtrl));
router.patch("/", checkToken , subscriptCtrl);
// router.patch("/subscription", check, subscriptCtrl);
router.post("/singup", validatorBody(schemaPost), wrapper(singUpCtrl));
router.get("/login", validatorBody(schemaPost), wrapper(singInCtrl));
router.post("/login", validatorBody(schemaPost), wrapper(singInCtrl));
router.get("/logout", checkToken , wrapper(singOutCtrl));
router.post("/logout", checkToken , wrapper(singOutCtrl));
router.patch(
  "/subscription",
  checkToken ,
  validatorBody(schemaPatch),
  wrapper(subscriptCtrl)
);

module.exports = router;
