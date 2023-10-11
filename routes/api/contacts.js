const express = require("express");

const { contactSchema } = require("../../schemas/contacts");
const { validate } = require("../../middlewares/validate");
const controller = require("../../controllers/contacts");

const router = express.Router();

router.get("/", controller.listContacts);

router.get("/:contactId", controller.getContactById);

router.post("/", validate(contactSchema), controller.addContact);

router.delete("/:contactId", controller.removeContact);

router.put("/:contactId", validate(contactSchema), controller.updateContact);

module.exports = router;