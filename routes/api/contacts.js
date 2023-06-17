const express = require("express");

const contactsController = require("../../controllers/contacts-controller");

const schemas = require("../../schemas/contacts");

const { validateBody } = require("../../decorators");

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", contactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.movieAddSchema),
  contactsController.addContact
);

router.delete("/:contactId", contactsController.deleteContactById);

router.put(
  "/:contactId",
  validateBody(schemas.movieAddSchema),
  contactsController.updateContactById
);

module.exports = router;
