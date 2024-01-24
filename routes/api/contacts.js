const express = require("express");
const contactsController = require("../../controllers/contacts");
const { isValidId } = require("../../middlewares/isValidId");
const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", isValidId, contactsController.getOneContact);

router.post("/", contactsController.addNewContact);

router.delete("/:contactId", isValidId, contactsController.deleteContact);

router.put("/:contactId", isValidId, contactsController.updateContactById);

router.patch(
  "/:contactId/favorite",
  isValidId,
  contactsController.updateContactFavorite
);

module.exports = router;
