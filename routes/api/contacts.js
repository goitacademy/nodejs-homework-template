const express = require("express");

const ContactsController = require("../../controllers/contactsController.js");
const validate = require("../../middlewares/validatitionMiddleware.js");
const schema = require("../../models/contact.js");

const router = express.Router();

router.get("/", ContactsController.getAllContacts);

router.get("/:contactId", ContactsController.getById);

router.post(
  "/",
  validate(schema.contactSchema),
  ContactsController.addNewContact
);

router.delete("/:contactId", ContactsController.deleteContact);

router.put(
  "/:contactId",
  validate(schema.contactSchema),
  ContactsController.updateContactById
);

router.patch(
  "/:contactId/favorite",
  validate(schema.favoriteSchema),
  ContactsController.updateFavorite
);

module.exports = router;
