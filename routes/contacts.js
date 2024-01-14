const express = require("express");

const ContactController = require("../controllers/contact");

const router = express.Router();
const jsonParser = express.json();

router.get("/", ContactController.getContacts);

router.get("/:id", ContactController.getContact);

router.post("/", jsonParser, ContactController.createContact);

router.put("/:id", jsonParser, ContactController.updateContact);

router.delete("/:id", ContactController.deleteContact);

router.patch(
  "/:id/favorite",
  jsonParser,
  ContactController.changeContactFavorite
);

module.exports = router;
