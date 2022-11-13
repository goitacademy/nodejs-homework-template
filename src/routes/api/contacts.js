const express = require('express');
const {
  contactsList,
  getOneContactById,
  removeContactById,
  addOneContact,
  updateContactById,
} = require('../../controllers/contactsControllers');

const { addContactSchema, updateContactSchema } = require("../../schemes/validationschemes");
const { validation } = require("../../middlewares/validationBody");

const router = express.Router();

router.get('/', contactsList);

router.get('/:contactId', getOneContactById);

router.post('/', validation(addContactSchema), addOneContact);

router.delete('/:contactId', removeContactById);

router.put('/:contactId', validation(updateContactSchema), updateContactById);

module.exports = router;
