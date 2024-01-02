const express = require("express");

const ContactsController = require("../../controllers/contactsController");

const validate = require("../../middlewares/validateBody");
const schema = require("../../middlewares/schemas/contacts");

const router = express.Router();

router.get("/", ContactsController.getAllContacts);

router.get("/:id", ContactsController.getById);

router.post("/", validate(schema), ContactsController.addNewContact);

router.delete("/:id", ContactsController.deleteContact);

router.put("/:id", validate(schema), ContactsController.updateContactById);

module.exports = router;
