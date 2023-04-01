const express = require("express");
const controllers = require("../../controllers/contactControllers");
const validation = require("../../middlewares/contactsValidate");
const {
  contactSchema,
  contactSchemaRequired,
} = require("../../validation/contactsSchema");

const router = express.Router();

router.get("/", controllers.listContacts);

router.get("/:id", controllers.getContactById);

router.post("/", validation(contactSchemaRequired), controllers.addContact);

router.delete("/:id", controllers.removeContact);

router.put("/:id", validation(contactSchema), controllers.updateContact);

module.exports = router;
