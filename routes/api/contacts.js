const express = require('express')

const {
  contacts: {
  getContacts,
  getContactById,
  addNewContact,
  deleteContact,
  updateContact,
  },
} = require("../../controllers");
 
const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");

const validateMiddleWate = validation(contactSchema);
const router = express.Router()

router.get('/', ctrlWrapper(getContacts));

router.get('/:Id', ctrlWrapper(getContactById));

router.post('/', validateMiddleWate, ctrlWrapper(addNewContact));

router.delete('/:Id', ctrlWrapper(deleteContact));

router.put('/:Id', validateMiddleWate, ctrlWrapper(updateContact));

module.exports = router;
