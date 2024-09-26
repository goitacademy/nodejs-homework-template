
const express = require("express")
const {contactValidation,putContactValidation,updFavContactValidation} = require ("../../validationSchema/validation")
const router = express.Router();
const {contactsCtrl}  = require('../../utils');
const {authenticate} = require("../../middlewares")

router.get("/", authenticate, contactsCtrl.getAll);
router.get("/:contactId",authenticate, contactsCtrl.getById);
router.post("/",authenticate,contactValidation, contactsCtrl.add);
router.delete("/:contactId",authenticate,contactsCtrl.remove);
router.put("/:contactId",authenticate, putContactValidation, contactsCtrl.update );
router.patch("/:contactId/favorite",authenticate,updFavContactValidation,contactsCtrl.updateStatusContact)
module.exports = router;


