const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contactsCtrl");
const schema = require("../../schemas/ValidateSchemasContacts");
const ValidateBodyContact = require("../../middlewares/ValidateBodyAddContact");
const paginationSchema = require("../../schemas/ValidatePagination");

router.get("/", ValidateBodyContact(paginationSchema), ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", ValidateBodyContact(schema.validateAddContactSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", ValidateBodyContact(schema.validateUpdateContactSchema), ctrl.updateContact);

router.patch("/:contactId/favorite", ValidateBodyContact(schema.validateUpdateContactSchema), ctrl.updateStatusContact);

module.exports = router;
