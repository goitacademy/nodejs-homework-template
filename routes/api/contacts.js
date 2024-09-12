const express = require('express');

const { contacts: ctrl } = require('../../controllers');
const validation = require('../../middlewares/validation');
const {
    addContactSchema,
    updateContactSchema,
    updateStatusContactSchema,
} = require('../../schemas/contacts');
const isValidId = require('../../middlewares/isValidId');
const authenticate = require('../../middlewares/authenticate');

const router = express();

router.get('/', authenticate, ctrl.listContacts);

router.get('/:contactId', authenticate, isValidId, ctrl.getContactById);

router.post(
    '/',
    authenticate,
    validation.addValid(addContactSchema),
    ctrl.addContact
);

router.delete('/:contactId', authenticate, isValidId, ctrl.removeContact);

router.put(
    '/:contactId',
    authenticate,
    isValidId,
    validation.updateValid(updateContactSchema),
    ctrl.updateContact
);

router.patch(
    '/:contactId/favorite',
    authenticate,
    validation.updateFavValid(updateStatusContactSchema),
    ctrl.updateStatusContact
);

module.exports = router;
