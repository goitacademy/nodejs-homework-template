const express = require("express");

const ContactsController = require("../../controllers/contactsController.js");
const validate = require("../../middlewares/validatitionMiddleware.js");
const schema = require("../../middlewares/schemas/contact.js");

const router = express.Router();

router.get("/", ContactsController.getAllContacts);

router.get("/:contactId", ContactsController.getById);

router.post("/", validate(schema), ContactsController.addNewContact);

router.delete("/:contactId", ContactsController.deleteContact);

router.put(
  "/:contactId",
  validate(schema),
  ContactsController.updateContactById
);

module.exports = router;
