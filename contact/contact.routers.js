const { Router } = require("express");
const ContactController = require("./contact.controller");
const { validate } = require("../helpers/validate");
const {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} = require("../schemas/contacts.schema");

const router = Router();

router.get("/", ContactController.qetContacts);
router.get(
  "/:contactId",
  ContactController.validateId,
  ContactController.getContactById
);
router.post("/", validate(createContactSchema), ContactController.addContact);
router.put(
  "/:contactId",
  ContactController.validateId,
  validate(updateContactSchema),
  ContactController.updateContact
);
router.delete(
  "/:contactId",
  ContactController.validateId,
  ContactController.removeContact
);
router.patch(
  "/:contactId/favorite",
  ContactController.validateId,
  validate(updateFavoriteSchema),
  ContactController.updateStatusContact
);

module.exports = router;
