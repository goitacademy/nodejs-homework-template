const express = require('express');

const { contacts: ctrl } = require('../../controllers/index');

const router = express.Router();

router.route('/').post(ctrl.postContact).get(ctrl.getAllContacts);

router
  .route('/:contactId')
  .get(ctrl.getContactById)
  .put(ctrl.putContactUpdate)
  .delete(ctrl.deleteContactById);

module.exports = router;
