const router = require('express').Router()

const { contacts } = require('../../controllers/index');
const { contactsSchema } = require('../../schemas/contactsSchema');
const { validation } = require('../../middleware/index');

router.get('/', contacts.getAll);

router.get('/:contactId', contacts.getId);

router.post('/', validation(contactsSchema), contacts.addContact);

router.delete('/:contactId', contacts.removeById);

router.put('/:contactId', validation(contactsSchema), contacts.updateById);

module.exports = router
