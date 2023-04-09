const { Router } = require('express');

const ctrl = require('../../controllers/contactsControllers');

const router = Router();

router
  .route('/')
  .get(ctrl.getContactsController)
  .post(ctrl.addContactController);

router
  .route('/:contactId')
  .get(ctrl.getContactController)
  .put(ctrl.updateContactController)
  .delete(ctrl.removeContactController);

module.exports = router;
