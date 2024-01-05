const express = require("express");

const contactsControllers = require("../../controllers/contacts");
// const { validateBody } = require("../../decorators");
// const { contactsSchema } = require("../../validators");

const router = express.Router();

router.get("/", contactsControllers.listContacts);
// router.post(
//   "/",
//   validateBody(contactsSchema.createContactsSchema),
//   contactsControllers.addContact
// );

// router.get("/:id", contactsControllers.getContactById);
// router.delete("/:id", contactsControllers.removeContact);
// router.put(
//   "/:id",
//   validateBody(contactsSchema.createContactsSchema),
//   contactsControllers.updateContact
// );

module.exports = router;
