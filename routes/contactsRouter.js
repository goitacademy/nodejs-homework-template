const express = require('express');
const router = express.Router();
const {asyncWrapper} = require("../helpers/apiHelpers");
const {
  addContactValidation,
  putContactValidation,
  patchContactValidation
} = require("../middlewares/validationMiddleware")
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  putContactController,
  patchContactController
} = require("../controllers/contactsController")
const {authMiddleware} = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.get('/', asyncWrapper(getContactsController));
router.get('/:contactId', asyncWrapper(getContactByIdController));
router.post('/', addContactValidation, asyncWrapper(addContactController));
router.delete('/:contactId', asyncWrapper(deleteContactController));
router.put('/:contactId', putContactValidation, asyncWrapper(putContactController));
router.patch('/:contactId/favorite', patchContactValidation, asyncWrapper(patchContactController))

module.exports = router;
