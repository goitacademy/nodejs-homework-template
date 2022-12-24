const express = require('express');

const { validation, paramValidation } = require('../../middalwares/validation');
const { contactSchema, schemaId } = require('../../schemasValidation/schemasValidation');

const validateMiddalware = validation(contactSchema);
// const validateMiddalwareId = paramValidation(schemaId);

const {getAll, getOneContact, addContact, deleteContact } = require('../../controllers/contactProcessing');

const router = express.Router()

router.get('/', getAll)

router.get('/:contactId', getOneContact);

router.post('/', validateMiddalware, addContact);

router.delete('/:contactId', deleteContact)

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router



