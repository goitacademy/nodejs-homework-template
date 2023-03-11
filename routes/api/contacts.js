const express = require('express');
const { controllerWrapper, validation, isValidId, auth } = require('../../middlewares');
const { contactJoiSchema, contactFavoriteSchema } = require('../../models');

const {
  contactsControllers: {
    getAllContacts,
    getContact,
    addContact,
    deleteContact,
    updateContactById,
    updateStatusContact,
  },
} = require('../../controllers/');

const router = express.Router();

router.post('/', auth, validation(contactJoiSchema), controllerWrapper(addContact));

router.get('/', auth, controllerWrapper(getAllContacts));

router.get('/:contactId', auth, isValidId, controllerWrapper(getContact));

router.put(
  '/:contactId',
  auth,
  isValidId,
  validation(contactJoiSchema),
  controllerWrapper(updateContactById)
);

router.patch(
  '/:contactId/favorite',
  auth,
  isValidId,
  validation(contactFavoriteSchema),
  controllerWrapper(updateStatusContact)
);

router.delete('/:contactId', isValidId, controllerWrapper(deleteContact));

module.exports = router;
