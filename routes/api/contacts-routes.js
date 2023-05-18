const express = require("express");

const contactsControllers = require("../../controllers/cintacts-controllers");

const schema = require("../../shemas/contactsChema");

const validateBody = require("../../utils/validateBody");
const router = express.Router();

router.get("/", contactsControllers.getAllContacts);

router.get("/:id", contactsControllers.getContactById);

router.post(
  "/",
  validateBody(schema.addContactSchema),
  contactsControllers.addContact
);

router.delete("/:id", contactsControllers.deleteContact);

router.put(
  "/:id",
  validateBody(schema.addContactSchema),
  contactsControllers.updateContact
);

module.exports = router;
