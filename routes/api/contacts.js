const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts-controller');

const { schemas } = require('../../models/contact');

const { validateBody, isValidId, authenticate } = require('../../middlewares');

router.get('/', authenticate, ctrl.getAllContacts);

router.get('/:id', authenticate, isValidId, ctrl.getContactById);

router.post('/', authenticate, validateBody(schemas.contactAddSchema), ctrl.addContact);

router.delete('/:id', authenticate, isValidId, ctrl.removeContactById);

router.put('/:id', authenticate, isValidId, ctrl.updateContactById);

router.patch('/:id/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact);

module.exports = router
