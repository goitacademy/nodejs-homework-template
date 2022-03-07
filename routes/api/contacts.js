const express = require('express');

const { schemaCreateContact } = require('../../middlewares/contacts-validations-schema');
const { validateBody } = require('../../middlewares/validation');

const contactsControllers = require('../../controllers/contacts');

const router = express.Router()

router.get('/', contactsControllers.getContacts);

router.get('/:contactId', contactsControllers.getContactById);

router.post('/', validateBody(schemaCreateContact), contactsControllers.postContact);

router.delete('/:contactId', contactsControllers.deleteContact)


router.put('/:contactId', validateBody(schemaCreateContact), contactsControllers.putContact)

module.exports = router
