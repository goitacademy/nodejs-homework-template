const express = require("express");
const { contactsController } = require("../../controllers");

const validateBody = require("../../middlewares/validate");
const schema = require("../../validation/schema");

const router = express.Router();

router.get("/", contactsController.listContacts);

router.get("/:contactId", contactsController.getContactById);

router.post("/", validateBody(schema), contactsController.addContact);

router.delete("/:contactId", contactsController.removeContact);

router.put(
  "/:contactId",
  validateBody(schema),
  contactsController.updateContact
);

router
  .route("/:contactId/favorite")
  .patch(contactsController.updateStatusContact);

module.exports = router;
