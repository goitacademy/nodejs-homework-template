const express = require('express')


// const validation = require("../../middlewares/validation");
// const contactSchema = require("../../schemas/contactSchemas");
// const validateMiddleware = validation(contactSchema);
const {asyncWrapper} = require('../../helpers/apihelpers')

const {listContacts, getContactById, removeContact, addContact, updateContact} = require('../../models/contacts');



const router = express.Router();


router.route('/')
  .post(asyncWrapper(addContact))
  .get(asyncWrapper(listContacts));

router
  .route('/:contactId')
  .get(asyncWrapper(getContactById))
  .put(asyncWrapper(updateContact))
  .delete(asyncWrapper(removeContact));

module.exports = router;