const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contactsConrollers");
const validateBody = require("../../decorators/validateBody");
const {
  contactAddSchema,
  contactUpdateSchema,
} = require("../../schemas/contactsSchemas");

router.get("/", contactsController.getAllContacts);

router.get("/:id", contactsController.getContactById);

router.post("/", validateBody(contactAddSchema), contactsController.addContact);

router.put(
  "/:id",
  validateBody(contactUpdateSchema),
  contactsController.updateContact
);

router.delete("/:id", contactsController.removeContact);

module.exports = router;
