const express = require('express')

const {
  getContacts,
  getContactnbyId,
  postContact,
  deleteContact,
  putContact,
} = require("../../controllers/contactsController");

const { validator } = require('../../middlewares/validationMidlewares');
const { contactSchema } = require('../../schemas/contactSchema');

const router = express.Router()

router.get('/', getContacts)


router.get('/:contactId', getContactnbyId)

router.post('/', validator(contactSchema), postContact)

router.delete('/:contactId', deleteContact)

router.put('/:contactId', validator(contactSchema), putContact)


module.exports = router
