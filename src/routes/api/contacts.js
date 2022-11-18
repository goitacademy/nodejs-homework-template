const express = require('express');
const {
  contactsList,
  getOneContactById,
  removeContactById,
  addOneContact,
  updateContactById,
  updateContactStatus
} = require('../../controllers/contactsControllers');

const { tryCatchWrapper } = require("../../helpers/helpers");

const { addContactSchema, updateContactSchema, updateStatusSchema } = require("../../schemes/validationschemes");
const { validation } = require("../../middlewares/validationBody");

const router = express.Router();

router.get('/', tryCatchWrapper(contactsList));

router.get('/:contactId', tryCatchWrapper(getOneContactById));

router.post('/', validation(addContactSchema), tryCatchWrapper(addOneContact));

router.delete('/:contactId', tryCatchWrapper(removeContactById));

router.put('/:contactId', validation(updateContactSchema), tryCatchWrapper(updateContactById));

router.put('/:contactId/favorite', validation(updateStatusSchema), tryCatchWrapper(updateContactStatus));

module.exports = router;
