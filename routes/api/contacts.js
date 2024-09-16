const express = require("express");
const { isValidId, authenticate } = require("../../middlewares");

const contactsController = require("../../controllers/contacts");

const router = express.Router();

router.get("/", authenticate, contactsController.getAllContacts);

router.get("/:id", authenticate, isValidId, contactsController.getContactById);

router.post("/", authenticate, contactsController.addContact);

router.delete(
  "/:id",
  authenticate,
  isValidId,
  contactsController.removeContact
);

router.put("/:id", isValidId, authenticate, contactsController.updateContact);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  contactsController.updateStatusContact
);

module.exports = router;