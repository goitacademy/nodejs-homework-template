const express = require("express");
const router = express.Router();
const { isValidId } = require("../../middlewares");

const contactsController = require("../../controllers/contacts/");

router.get("/", contactsController.listContacts);
router.post("/", contactsController.addContact);
router.get("/:contactId", isValidId, contactsController.getContactById);
router.put("/:contactId", isValidId, contactsController.updateContact);
router.patch("/:contactId/favorite", isValidId, contactsController.updateFavorite);
router.delete("/:contactId", isValidId, contactsController.removeContact);

module.exports = router;
