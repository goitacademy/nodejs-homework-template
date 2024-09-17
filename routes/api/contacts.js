const express = require("express");

const contactsController = require("../../controllers/contacts-controllers.js");

const isEmptyBody = require("../../middlewares/index.js");

const { validateBody } = require("../../decorators/index.js");

const contactAddSchema = require("../../schemas/contact-schemas.js");

const contactAddValidate = validateBody(contactAddSchema);

const router = express.Router();

router.get("/", contactsController.listContacts);

router.get("/:contactId", contactsController.getContactById);

router.post(
  "/",
  isEmptyBody,
  contactAddValidate,
  contactsController.addContact
);

router.delete("/:contactId", contactsController.removeContact);

router.put(
  "/:contactId",
  isEmptyBody,
  contactAddValidate,
  contactsController.updateContact
);

module.exports = router;
