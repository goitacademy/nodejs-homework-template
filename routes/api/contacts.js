const express = require('express')

const modelsMiddleware = require('../../middlewares/models');

// const validation = require("../../middlewares/validation");
// const contactSchema = require("../../schemas/contactSchemas");
// const validateMiddleware = validation(contactSchema);

const {listContacts, getContactById, removeContact, addContact, updateContact} = require('../../models/contacts');



const router = express.Router();

router.use(modelsMiddleware);

router.route('/')
  .post(addContact)
  .get(listContacts);

router
  .route('/:contactId')
  .get(getContactById)
  .patch(updateContact)
  .delete(removeContact);

module.exports = router;