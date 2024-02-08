const express = require("express");
const router = express.Router();
const ctrlContact = require("../../controller/contactsController");
const authorization = require("../../tools/authorization");

router.get("/", authorization, ctrlContact.get);
router.get("/:contactId", authorization, ctrlContact.getById);
router.post("/", authorization, ctrlContact.createContact);
router.delete("/:contactId", authorization, ctrlContact.removeContact);
router.put("/:contactId", authorization, ctrlContact.updateContact);
router.patch("/:contactId/favorite", authorization, ctrlContact.updateFavorite);

module.exports = router;
