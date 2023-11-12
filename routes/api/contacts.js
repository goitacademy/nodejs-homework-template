const express = require("express");
const router = express.Router();
const { checkRequestBody } = require("../../helpers");
const jsonParser = express.json();
const ContactsControllers = require("../../controllers/contacts");
router.get("/", ContactsControllers.getAll);
router.get("/:contactId", ContactsControllers.getById);
router.post("/", jsonParser, ContactsControllers.postContact);
router.delete("/:contactId", ContactsControllers.deleteById);
router.patch(
  "/:contactId/favorite",
  jsonParser,
  checkRequestBody,
  ContactsControllers.updateStatusContact
);
router.put("/:contactId", jsonParser, ContactsControllers.putById);
module.exports = router;
