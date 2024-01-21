const express = require('express');

const ContactsService = require("../../controllers/ContactsService.js");
const validate = require("../../middlewares/validate.js");
const schema = require("../../middlewares/schema/contact.js");
const authMiddleware = require("../../middlewares/users");

const router = express.Router();


router.get("/", authMiddleware, ContactsService.getAllContacts);

router.get("/:contactId", authMiddleware,ContactsService.getContactById);

router.post("/", authMiddleware, validate(schema), ContactsService.addNewContact);

router.delete("/:contactId", authMiddleware, ContactsService.deleteContact);

router.put(
  "/:contactId",
  authMiddleware, validate(schema),
  ContactsService.updateContactId
);

router.patch(
  "/:contactId/favorite",
  authMiddleware, validate(schema),
  ContactsService.changeContactFavorite
);

module.exports = router

