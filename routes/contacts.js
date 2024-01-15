const express = require("express");

const ContactController = require("../controllers/contact");

const isValidId = require("../schemas/isValidId");

const router = express.Router();
const jsonParser = express.json();

router.get("/", ContactController.getContacts);

router.get("/:id", isValidId, ContactController.getContact);

router.post("/", jsonParser, ContactController.createContact);

router.put("/:id", isValidId, jsonParser, ContactController.updateContact);

router.delete("/:id", isValidId, ContactController.deleteContact);

router.patch(
  "/:id/favorite",
  isValidId,
  jsonParser,
  ContactController.changeContactFavorite
);

module.exports = router;
