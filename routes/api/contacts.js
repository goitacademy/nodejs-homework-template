const express = require("express");

const router = express.Router();

const contactsControllers = require("../../controllers/contacts-controllers");

const schems = require("../../schems/schem-contacts");

const { validateBody } = require("../../decorators/validateBody");

router.get("/", contactsControllers.getAllContacts);

router.get("/:id", contactsControllers.getContactId);

router.post(
  "/",
  validateBody(schems.addSchema),
  contactsControllers.addContact
);

router.delete("/:id", contactsControllers.removeContact);

router.put(
  "/:id",
  validateBody(schems.addSchema),
  contactsControllers.updateContact
);

module.exports = router;
