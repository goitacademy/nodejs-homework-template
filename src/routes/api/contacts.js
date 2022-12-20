const express = require("express");
const router = express.Router();
const { addPostValidation, patchPostValidation} = require("../../middlewares/validationMiddleware.js");
const { getContacts, getContactId, deleteContact, postContact, putContact } = require("../../controllers/contactsController.js");

router.get("/", getContacts);
router.get("/:contactId", getContactId);
router.post("/", addPostValidation, postContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", patchPostValidation, putContact);

module.exports = router;
