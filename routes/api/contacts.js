const express = require('express');

const { joiContactSchema, joiFavoriteSchema } = require('../../models');
const { validateBody, ctrlWrapper, auth } = require('../../middlewares');

const contactsControllers = require('../../controllers/contacts');

const router = express.Router()

router.get('/', auth, ctrlWrapper(contactsControllers.getContacts));

router.get('/:contactId', ctrlWrapper(contactsControllers.getContactById));

router.post('/', auth, validateBody(joiContactSchema), ctrlWrapper(contactsControllers.postContact));

router.delete('/:contactId', ctrlWrapper(contactsControllers.deleteContact))

router.put('/:contactId', validateBody(joiContactSchema), ctrlWrapper(contactsControllers.putContact))

router.patch('/:contactId/favorite', validateBody(joiFavoriteSchema), ctrlWrapper(contactsControllers.patchFavorite))

module.exports = router
