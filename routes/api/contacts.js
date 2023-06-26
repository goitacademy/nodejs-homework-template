const express = require('express');

const {
  getContactsList,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require('../../controllers/contactsControllers.js');

const { checkContactById } = require('../../middlewares/contactsMiddlewares.js');

const router = express.Router();

router.route('/').get(getContactsList).post(addContact);

router.use('/:contactId', checkContactById);
router.route('/:contactId').get(getById).delete(removeContact).put(updateContact);

module.exports = router;
