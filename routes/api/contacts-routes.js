const express = require("express");
const router = express.Router();
const { isValidId } = require("../../middlewares");
const contactsController = require("../../controllers/contacts/");
const { errorWrapper } = require("../../decorators");

router.get("/", errorWrapper(contactsController.listContacts));
router.post("/", errorWrapper(contactsController.addContact));
router.get("/:contactId", isValidId, errorWrapper(contactsController.getContactById));
router.put("/:contactId", isValidId, errorWrapper(contactsController.updateContact));
router.patch("/:contactId/favorite", isValidId, errorWrapper(contactsController.updateFavorite));
router.delete("/:contactId", isValidId, errorWrapper(contactsController.removeContact));

module.exports = router;
