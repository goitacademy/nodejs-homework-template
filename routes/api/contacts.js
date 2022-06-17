const express = require("express");
const router = express.Router();

const controllerWrapper = require("../../middlewares/controllerWrapper");
const contactsValidation = require("../../middlewares/validation");
const userIsAuth = require("../../middlewares/userIsAuth");
const { joiSchemaAll, joiSchemaFavorite } = require("../../models/contacts");
const { contacts: contactsController } = require("../../controllers");

router.get("/", userIsAuth, controllerWrapper(contactsController.listContacts));

router.get(
  "/:contactId",
  userIsAuth,
  controllerWrapper(contactsController.getContactById)
);

router.delete(
  "/:contactId",
  controllerWrapper(contactsController.removeContact)
);

router.post(
  "/",
  userIsAuth,
  contactsValidation(joiSchemaAll),
  controllerWrapper(contactsController.addContact)
);

router.put(
  "/:contactId",
  userIsAuth,
  contactsValidation(joiSchemaAll),
  controllerWrapper(contactsController.updateContact)
);

router.patch(
  "/:contactId/favorite",
  userIsAuth,
  contactsValidation(joiSchemaFavorite),
  controllerWrapper(contactsController.updateStatusContact)
);

module.exports = router;
