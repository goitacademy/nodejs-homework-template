const express = require("express");

const { contactsSchema, updateStatusSchema } = require("../../models/contact");
const { validate } = require("../../middlewares/validate");
const { isValidId } = require("../../middlewares/isValidId");
const controller = require("../../controllers/contacts");

const router = express.Router();

router.get("/", controller.listContacts);

router.get("/:contactId", isValidId, controller.getContactById);

router.post("/", validate(contactsSchema), controller.addContact);

router.delete("/:contactId", isValidId, controller.removeContact);

router.put("/:contactId", isValidId, validate(contactsSchema), controller.updateContact);

router.patch("/:contactId/favorite", isValidId, validate(updateStatusSchema) ,  controller.updateStatusContact)

module.exports = router;