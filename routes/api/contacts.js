const express = require('express')
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../controllers/contacts");

const validateContactBody = require("../../middlewares/index");
const scheme = require("../../scheme/contacts");

const router = express.Router()

router.get('/', listContacts);

router.get('/:contactId', getContactById);

router.post('/', validateContactBody(scheme), addContact);

router.delete('/:contactId',removeContact );

router.put('/:contactId', validateContactBody(scheme), updateContact)

module.exports = router
