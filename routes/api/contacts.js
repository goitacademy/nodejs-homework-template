const express = require('express');

const validation = require('../../middlewares/validation');
const schema = require('../../schemas/contacts');

const controllerWrapper = require('../../middlewares/controllerWrapper');

const {
  getAllContacts,
  getContact,
  contactAdd,
  deleteContact,
  updateContactById,
} = require('../../controllers/contacts/');

const router = express.Router();

router.get('/', controllerWrapper(getAllContacts));

router.get('/:contactId', controllerWrapper(getContact));

router.post('/', validation(schema), controllerWrapper(contactAdd));

router.delete('/:contactId', controllerWrapper(deleteContact));

router.put('/:contactId', validation(schema), controllerWrapper(updateContactById));

module.exports = router;