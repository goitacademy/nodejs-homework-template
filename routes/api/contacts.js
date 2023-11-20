const express = require("express");
require("./dataBase");

const ContactController = require("../../controllers/contact");

const isValidId = require("../../middlewares/isValidId");

const jsonParser = express.json();

const router = express.Router();

router.get("/", ContactController.listContacts);

router.get("/:contactId", isValidId, ContactController.getContactById);

router.post("/", jsonParser, ContactController.addContact);

router.delete("/:contactId", isValidId, ContactController.removeContact);

router.put(
  "/:contactId",
  isValidId,
  jsonParser,
  ContactController.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  jsonParser,
  ContactController.updateStatusContact
);

module.exports = router;