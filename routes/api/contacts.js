const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts');

const { authenticate, validateBody, validateId } = require('../../middlewars');
const {schemas} = require('../../models/contacts')

router
  .get('/', authenticate, ctrl.listContacts)
  .get('/:contactId', authenticate, validateId, ctrl.getContactById)
  .post('/', authenticate, validateBody(schemas.addContactSchema), ctrl.addContact)
  .delete('/:contactId', authenticate, validateId, ctrl.deleteContact)
  .put(
    '/:contactId',
    authenticate,
    validateId,
    validateBody(schemas.updateContactSchema),
    ctrl.updateContact
  )
  .patch(
    '/:contactId/favorite',
    authenticate,
    validateId,
    validateBody(schemas.updateStatusSchema),
    ctrl.updateStatus
  );

module.exports = router;