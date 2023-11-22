const express = require("express");
require("./dataBase");

const ContactController = require("../../controllers/contact");

const { isValidId, authenticate } = require("../../middlewares");

const jsonParser = express.json();

const router = express.Router();

router.get("/", authenticate, ContactController.listContacts);

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  ContactController.getContactById
);

router.post("/", authenticate, jsonParser, ContactController.addContact);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ContactController.removeContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  jsonParser,
  ContactController.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  jsonParser,
  ContactController.updateStatusContact
);

module.exports = router;