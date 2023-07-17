const express = require('express');
const {
  ctrlListContacts,
  ctrlAddContact,
  ctrlGetContactById,
  ctrlRemoveContact,
  ctrlUpdateContact,
} = require('../../controllers/ctrlContacts');

const router = express.Router();

router.route('/').get(ctrlListContacts).post(ctrlAddContact);

router
  .route('/:contactId')
  .get(ctrlGetContactById)
  .put(ctrlUpdateContact)
  .delete(ctrlRemoveContact);

module.exports = router;
