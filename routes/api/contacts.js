const express = require('express');

const ContactsService = require("../../controllers/ContactsService.js");
const validate = require("../../middlewares/validate.js");
const schema = require("../../middlewares/schema/contact.js");

const router = express.Router()

router.get("/", ContactsService.getAllContacts);


router.get("/:contactId", ContactsService.getContactById);

router.post("/", validate(schema), ContactsService.addNewContact);

router.delete("/:contactId", ContactsService.deleteContact);

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
