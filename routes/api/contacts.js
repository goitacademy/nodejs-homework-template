const express = require('express');

const {
  ctrlListContacts,
  ctrlAddContact,
  ctrlGetContactById,
  ctrlRemoveContact,
  ctrlUpdateContact,
} = require('../../controllers/ctrlContacts');

const { validateBody, isValidId } = require('../../middlewares');

const { schemaBodyObject, schemaBody, schemaStatusContact } = require('../../schema');

const router = express.Router();

router
  .route('/')
  .get(ctrlListContacts)
  .post(validateBody(schemaBodyObject), validateBody(schemaBody), ctrlAddContact);

router
  .route('/:contactId')
  .get(isValidId, ctrlGetContactById)
  .put(isValidId, validateBody(schemaBodyObject), validateBody(schemaBody), ctrlUpdateContact)
  .delete(isValidId, ctrlRemoveContact);

router
  .route('/:contactId/favorite')
  .patch(isValidId, validateBody(schemaStatusContact), ctrlUpdateContact);

module.exports = router;
