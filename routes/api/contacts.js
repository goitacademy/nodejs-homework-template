const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers');

const { validateBody, isValidId } = require('../../middlewares');

const { schemas } = require('../../models/contact');

router.get('/', ctrl.listContacts);

router.get('/:contactId', isValidId, ctrl.getContactById);

router.post('/', validateBody(schemas.addSchema), ctrl.addContact);

router.delete('/:contactId', isValidId, ctrl.removeContact);

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrl.updateContact);
router.patch(
    '/:contactId/favorite',
    isValidId,
    validateBody(schemas.updateStatusContactSchema),
    ctrl.updateStatusContact
);

module.exports = router;
