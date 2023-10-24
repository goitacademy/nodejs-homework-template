const express = require('express');

const { isValidId } = require('../../helpers/isValidId');
const { addScheme, favoriteScheme } = require('../../models/contact');
const validateBody = require('../../helpers/validateBody');
const authenticate = require('../../helpers/authenticate')

const router = express.Router()

const ctrl = require('../../controllers/contacts')

router.get('/', authenticate, ctrl.getAll)

router.get('/:contactId', authenticate, isValidId, ctrl.getById)

router.post('/', authenticate, validateBody(addScheme), ctrl.addContact)

router.delete('/:contactId', authenticate, isValidId, ctrl.removeContact)

router.put('/:contactId', authenticate, validateBody(addScheme), isValidId, ctrl.updateContact)

router.patch('/:contactId/favorite', authenticate, validateBody(favoriteScheme), isValidId, ctrl.updateContactFavorite)

module.exports = router
