const { Router } = require('express');

const {
  getContactsController,
  getContactController,
  addContactController,
  updateContactController,
  removeContactController,
} = require('../../controllers/contactsControllers');

const router = Router();

router.route('/').get(getContactsController).post(addContactController);

router
  .route('/:contactId')
  .get(getContactController)
  .put(updateContactController)
  .delete(removeContactController);

module.exports = router;
