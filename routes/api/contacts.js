const express = require("express");
require("./dataBase");

const ContactController = require("../../controllers/contact");

const validId = require("../../middlewares/validId");

const jsonParser = express.json();

const router = express.Router();

router.get("/", ContactController.listContacts);

router.get("/:contactId", validId, ContactController.getContactById);

router.post("/", jsonParser, ContactController.addContact);

router.delete("/:contactId", validId, ContactController.removeContact);

router.put(
  "/:contactId",
  validId,
  jsonParser,
  ContactController.updateContact
);

router.patch(
  "/:contactId/favorite",
  validId,
  jsonParser,
  ContactController.updateStatusContact
);

module.exports = router;