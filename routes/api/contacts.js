const express = require('express');

const {
  ctrlListContacts,
  ctrlAddContact,
  ctrlGetContactById,
  ctrlRemoveContact,
  ctrlUpdateContact,
} = require('../../controllers/ctrlContacts');
const validateBody = require('../../middlewares/validateBody');

const { schemaBodyObject, schemaBody } = require('../../schema');

const router = express.Router();

router
  .route('/')
  .get(ctrlListContacts)
  .post(validateBody(schemaBodyObject), validateBody(schemaBody), ctrlAddContact);

router
  .route('/:contactId')
  .get(ctrlGetContactById)
  .put(validateBody(schemaBodyObject), validateBody(schemaBody), ctrlUpdateContact)
  .delete(ctrlRemoveContact);

module.exports = router;
