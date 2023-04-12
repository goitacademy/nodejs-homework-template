
const express = require("express")
// const contactsController = require("./controllers/contactsController");
const {contactValidation,putContactValidation} = require ("../../validationSchema/validation")
const router = express.Router();
const { contactsCtrl } = require('../../routes/api/controllers/index');
const { getAll, getById, add, remove, update } = contactsCtrl;

router.get("/", getAll);
router.get("/:contactId", getById);
router.post("/", contactValidation, add);
router.delete("/:contactId",remove);
router.put("/:contactId", putContactValidation, update );

module.exports = router;


