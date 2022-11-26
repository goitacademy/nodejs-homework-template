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
const { addContactSchema, updateContactSchema, updateStatusSchema } = require("../../schemes/validationContactsSchemes");
const { validation } = require("../../middlewares/validationBody");
const { auth } = require("../../middlewares/auth");

const router = express.Router();

router.get('/', tryCatchWrapper(auth), tryCatchWrapper(contactsList));
router.get('/:contactId', tryCatchWrapper(auth), tryCatchWrapper(getOneContactById));
router.post('/', tryCatchWrapper(auth), validation(addContactSchema), tryCatchWrapper(addOneContact));
router.delete('/:contactId', tryCatchWrapper(auth), tryCatchWrapper(removeContactById));
router.put('/:contactId', tryCatchWrapper(auth), validation(updateContactSchema), tryCatchWrapper(updateContactById));
router.put('/:contactId/favorite', tryCatchWrapper(auth), validation(updateStatusSchema), tryCatchWrapper(updateContactStatus));

module.exports = router;
