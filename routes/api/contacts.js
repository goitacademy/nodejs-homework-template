const express = require('express')

const router = express.Router();

const ctrl = require('../../controllers/contacts.js');
const {isValidId, validateBody, authenticate, checkFavoriteExist} = require('../../middlewares');
const {schemas} = require('../../models/contact.js');

router.get('/', authenticate, checkFavoriteExist,  ctrl.getAll)

router.get('/:contactId', authenticate, isValidId, ctrl.getById)

router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.add)

router.delete('/:contactId', authenticate, isValidId, ctrl.remove)

router.put('/:contactId', authenticate, isValidId, validateBody(schemas.addSchema), ctrl.update)

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact)

module.exports = router;

