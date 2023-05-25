const express = require('express');
const { 
  getListContacts,
  getContactById,
  postContact,
  deleteContactByid,
  putContactById
} = require('../../controllers/contacts-controller.js');
const validateBody = require('../../utils/validateBody.js');
const { contactsSchema } = require('../../schemas')

const router = express.Router()

router.get('/', getListContacts)

router.get('/:contactId', getContactById)

router.post('/', validateBody(contactsSchema), postContact)

router.delete('/:contactId', deleteContactByid)

router.put('/:contactId', validateBody(contactsSchema), putContactById)

module.exports = router