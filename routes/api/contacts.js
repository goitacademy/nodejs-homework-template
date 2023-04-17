
const express = require("express")
// const contactsController = require("./controllers/contactsController");
const {contactValidation,putContactValidation} = require ("../../validationSchema/validation")
const router = express.Router();
const contactsCtrl  = require('../../controllers');
// const { getAll, getById, add, remove, update } = contactsCtrl;

router.get("/", contactsCtrl.getAll);
router.get("/:contactId", contactsCtrl.getById);
router.post("/", contactValidation, contactsCtrl.add);
router.delete("/:contactId",contactsCtrl.remove);
router.put("/:contactId", putContactValidation, contactsCtrl.update );

module.exports = router;


