const express = require('express');

const { joiContactSchema, joiFavoriteSchema } = require('../../models');
const { validateBody } = require('../../middlewares/validation');

const contactsControllers = require('../../controllers/contacts');

const router = express.Router()

router.get('/', contactsControllers.getContacts);

router.get('/:contactId', contactsControllers.getContactById);

router.post('/', validateBody(joiContactSchema), contactsControllers.postContact);

router.delete('/:contactId', contactsControllers.deleteContact)

router.put('/:contactId', validateBody(joiContactSchema), contactsControllers.putContact)

router.patch('/:contactId/favorite', validateBody(joiFavoriteSchema), contactsControllers.patchFavorite)

module.exports = router
