const express = require("express");

const contactsControllers = require('../../controllers/contacts-controllers');

const {validateData} = require("../../decorators");

const schemas = require("../../schemas/contacts");

const router = express.Router();


router.get("/", contactsControllers.listContacts);

router.get("/:contactId", contactsControllers.getById);

router.post("/", validateData(schemas.contactAddSchema), contactsControllers.add);

router.delete("/:contactId",  contactsControllers.removeContact);

router.put("/:contactId",  validateData(schemas.contactAddSchema), contactsControllers.update);

module.exports = router;
