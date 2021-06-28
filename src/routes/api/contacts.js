const express = require('express');

const router = express.Router();
const { authMiddleware } = require('../../middlewares/authMiddleware');

const { asyncWrapper } = require('../../helpers/apiHelpers');

const {
  postValidation,
  patchValidation,
} = require('../../middlewares/contactValidationMiddleware');

const ContactsController = require('../../controllers/contactControllers');

router.use(authMiddleware);

router.get('/', asyncWrapper(ContactsController.getContact));

router.get('/:contactId', asyncWrapper(ContactsController.getContactWithId));

router.post('/', postValidation, asyncWrapper(ContactsController.postContact));

router.delete('/:contactId', asyncWrapper(ContactsController.deleteContact));

router.patch(
  '/:contactId',
  patchValidation,
  asyncWrapper(ContactsController.patchContact)
);

router.patch(
  '/:contactId/favorite',
  patchValidation,
  asyncWrapper(ContactsController.patchContactStatus)
);

module.exports = router;
