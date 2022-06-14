const express = require("express");
const router = express.Router();

const controllerWrapper = require("../../middlewares/controllerWrapper");
const contactsValidation = require("../../middlewares/contactsValidation");
const { joiSchemaAll, joiSchemaFavorite } = require("../../models/contacts");
const { contacts: contactsController } = require("../../controllers");

router.get("/", controllerWrapper(contactsController.listContacts));

router.get("/:contactId", controllerWrapper(contactsController.getContactById));

router.delete(
  "/:contactId",
  controllerWrapper(contactsController.removeContact)
);

router.post(
  "/",
  contactsValidation(joiSchemaAll),
  controllerWrapper(contactsController.addContact)
);

router.put(
  "/:contactId",
  contactsValidation(joiSchemaAll),
  controllerWrapper(contactsController.updateContact)
);

router.patch(
  "/:contactId/favorite",
  contactsValidation(joiSchemaFavorite),
  controllerWrapper(contactsController.updateStatusContact)
);

module.exports = router;
