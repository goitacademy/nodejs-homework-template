const express = require("express");
const router = express.Router();
const { contactsController } = require("../../controllers");
const auth = require("../../middleware/auth");

router.use(auth);

router.get("/", contactsController.listContacts);

router.get("/:contactId", contactsController.getContactById);

router.post("/", contactsController.addContact);

router.delete("/:contactId", contactsController.removeContact);

router.put("/:contactId", contactsController.updateContact);

router.patch("/:contactId/favorite", contactsController.updateContactFavorite);

module.exports = router;
