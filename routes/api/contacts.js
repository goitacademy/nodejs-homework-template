const express = require('express')
const ctrl = require('../../controllers/contacts-controller')
const { schemas } = require('../../models/contact');
const { validateBody } = require('../../middlewares');
const { isValidId } = require('../../middlewares');

const router = express.Router()

router.get('/', ctrl.getAllContacts)

router.get('/:contactId', isValidId, ctrl.getContactById)

router.post('/', ctrl.addContact)

router.delete('/:contactId', isValidId, ctrl.deleteContactById)

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrl.updateContactById)

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact)

module.exports = router;
