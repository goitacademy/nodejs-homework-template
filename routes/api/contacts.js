const express = require('express')

const { listContacts,
   getContactById,
   addContact,
   removeContact,
   updateContact
} = require('../../controllers')
const { ctrlWrapper } = require('../../helpers')

const  validation  = require('../../middlewares/validation')
const { schemaAdd, schemaUpdate } = require('../../schemas/contacts');

const router = express.Router();

router.get('/', ctrlWrapper(listContacts))

router.get('/:id', ctrlWrapper(getContactById))

router.post('/', validation(schemaAdd), ctrlWrapper(addContact));

router.delete('/:id',ctrlWrapper(removeContact))

router.put('/:id',validation(schemaUpdate), ctrlWrapper(updateContact))

module.exports = router;