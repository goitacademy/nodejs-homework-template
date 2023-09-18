const express = require("express");

const router = express.Router();

const contactsController = require("../../controllers/contacts");

const validateId = require("../../middlewares/index");

router.get("/", contactsController.getContacts);

router.get("/:contactId", validateId, contactsController.getContactById);

router.post("/", contactsController.createContact);

router.delete("/:contactId", validateId, contactsController.deleteContact);

router.put("/:contactId", validateId, contactsController.updateContact);

router.patch(
  "/:contactId/favorite",
  validateId,
  contactsController.updateFavoriteStatus
);

module.exports = router;
