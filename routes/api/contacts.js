const express = require("express");
const contactsController = require("../../controllers/contacts-controller");
const { validateBody } = require("../../decorators");
const schemas = require("../../schemas/contacts-schemas");
const router = express.Router();
const contactAddValidate = validateBody(schemas.contactAddSchema);

router.get("/", contactsController.getAllContacts);

router.get("/:id", contactsController.getContactById);

router.post("/", contactAddValidate, contactsController.addContact);

router.delete("/:id", contactsController.removeContact);

router.put("/:id", contactAddValidate, contactsController.updateContact);

module.exports = router;
