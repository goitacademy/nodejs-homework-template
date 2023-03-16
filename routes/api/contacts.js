const express = require('express')


// const validation = require("../../middlewares/validation");
// const contactSchema = require("../../schemas/contactSchemas");
// const validateMiddleware = validation(contactSchema);
const {asyncWrapper} = require('../../helpers/apihelpers')

const {listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact} = require('../../models/contacts');



const router = express.Router();


router.route('/')
  .post(asyncWrapper(addContact))
  .get(asyncWrapper(listContacts));

router
  .route('/:contactId')
  .get(asyncWrapper(getContactById))
  .put(asyncWrapper(updateContact))
  .delete(asyncWrapper(removeContact));

router.route('/:contactId/favorite')
  .patch(asyncWrapper(updateStatusContact));
module.exports = router;