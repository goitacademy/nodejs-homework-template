const express = require("express");

const ContactsController = require("../../controllers/contactsController.js");
const validate = require("../../middlewares/validatitionMiddleware.js");
const authMiddleware = require("../../middlewares/authMiddleware.js");
const schema = require("../../models/contact.js");

const router = express.Router();

router.get("/", authMiddleware, ContactsController.getAllContacts);

router.get("/:contactId", authMiddleware, ContactsController.getById);

router.post(
  "/",
  authMiddleware,
  validate(schema.contactSchema),
  ContactsController.addNewContact
);

router.delete("/:contactId", authMiddleware, ContactsController.deleteContact);

router.put(
  "/:contactId",
  authMiddleware,
  validate(schema.contactSchema),
  ContactsController.updateContactById
);

router.patch(
  "/:contactId/favorite",
  authMiddleware,
  validate(schema.favoriteSchema),
  ContactsController.updateFavorite
);

module.exports = router;
