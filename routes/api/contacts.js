const express = require('express');

const validation = require('../../middlewares/validation');
const contactsSchema = require('../../schemas/contacts-schema');
const {contacts} = require('../../controllers');

const router = new express.Router();

const validateMiddleware = validation(contactsSchema);

router.get('/', contacts.getAll);
router.get('/:contactId', contacts.getById);
router.post('/', validateMiddleware, contacts.add);
router.delete('/:contactId', contacts.removeById);
router.put('/:contactId', validateMiddleware, contacts.updateById);

module.exports = router;
