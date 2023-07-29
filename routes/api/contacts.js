const express = require('express');

const {
  ctrlListContacts,
  ctrlAddContact,
  ctrlGetContactById,
  ctrlRemoveContact,
  ctrlUpdateContact,
} = require('../../controllers/ctrlContacts');

const { validateBody, isValidId, authenticate } = require('../../middlewares');

const { schemaBodyObject, schemaBody, schemaStatusContact } = require('../../schema');

const router = express.Router();

router
  .route('/')
  .get(authenticate, ctrlListContacts)
  .post(authenticate, validateBody(schemaBodyObject), validateBody(schemaBody), ctrlAddContact);

router
  .route('/:contactId')
  .get(authenticate, isValidId, ctrlGetContactById)
  .put(
    authenticate,
    isValidId,
    validateBody(schemaBodyObject),
    validateBody(schemaBody),
    ctrlUpdateContact
  )
  .delete(authenticate, isValidId, ctrlRemoveContact);

router
  .route('/:contactId/favorite')
  .patch(authenticate, isValidId, validateBody(schemaStatusContact), ctrlUpdateContact);

module.exports = router;
