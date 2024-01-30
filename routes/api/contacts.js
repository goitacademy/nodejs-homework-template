const express = require("express");
const service = require("../../models/contacts");
const router = express.Router();

router.get("/", service.listContacts);

router.get("/:contactId", service.getContactById);

router.post( "/", service.addContact
);

router.delete("/:contactId", service.removeContact);

router.put("/:contactId", service.updateContact);
router.patch(
  "/:contactId/favorite", service.updateFavoriteToContact);

module.exports = router;