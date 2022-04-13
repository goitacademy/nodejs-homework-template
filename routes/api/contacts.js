const express = require("express");
const contactsControllers = require("../../controllers/contacts");
const { contactSchema } = require("../../schemas/contacts-validation-schemes");
const { validateBody } = require("../../middlewares/validation");
const router = express.Router();

router.get("/", contactsControllers.listContacts);

router.get("/:contactId", contactsControllers.getContactById);

router.post("/", validateBody(contactSchema), contactsControllers.addContact);

router.delete("/:contactId", contactsControllers.removeContact);

router.put(
  "/:contactId",
  validateBody(contactSchema),
  contactsControllers.updateContact
);

router.patch("/:contactId/favorite", contactsControllers.updateStatusContact);

module.exports = router;
