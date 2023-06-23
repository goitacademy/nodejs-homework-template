const express = require("express");

const { controllerWrapper } = require("../../helpers");
const contactsController = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");
const schemes = require("../../schemes");

const router = express.Router();

router.get("/", controllerWrapper(contactsController.listContacts));

router.get("/:contactId", controllerWrapper(contactsController.getContactById));

router.post(
  "/",
  validateBody(schemes.contactsSchema),
  controllerWrapper(contactsController.addContact)
);

router.delete(
  "/:contactId",
  controllerWrapper(contactsController.removeContact)
);

router.put(
  "/:contactId",
  validateBody(schemes.contactsSchema),
  controllerWrapper(contactsController.updateContact)
);

module.exports = router;
