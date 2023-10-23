const express = require('express');

const { isValidId } = require('../../helpers/isValidId');
const { addScheme, favoriteScheme } = require('../../models/contact');
const validateBody = require('../../helpers/validateBody')

const router = express.Router()

const ctrl = require('../../controllers/contacts')

router.get('/', ctrl.getAll)

router.get('/:contactId', isValidId, ctrl.getById)

router.post('/', validateBody(addScheme), ctrl.addContact)

router.delete('/:contactId', isValidId, ctrl.removeContact)

router.put('/:contactId', validateBody(addScheme), isValidId, ctrl.updateContact)

router.patch('/:contactId/favorite', validateBody(favoriteScheme), isValidId, ctrl.updateContactFavorite)

module.exports = router
