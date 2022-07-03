const { Router } = require('express');
const { contactsController } = require('../../../controllers');
const { validationWraperSchema, validateQuery, validateId, guard } = require('../../../middlewares');
const {
  createJoiSchema,
  updateJoiSchema,
  updateFavoriteJoiSchema,
  queryJoiSchema,
} = require('../../../models/contact');

const router = new Router();

router.get('/', [guard, validateQuery(queryJoiSchema)], contactsController.getContactsList);

router.get('/:contactId', [guard, validateId], contactsController.getContactsById);

router.post('/', [guard, validationWraperSchema(createJoiSchema)], contactsController.addContact);

router.delete('/:contactId', [guard, validateId], contactsController.removeContactById);

router.put(
  '/:contactId',
  [guard, validateId, validationWraperSchema(updateJoiSchema)],
  contactsController.updateContactById,
);

router.patch(
  '/:contactId/favorite',
  guard,
  validationWraperSchema(updateFavoriteJoiSchema),
  contactsController.updateStatusContact,
);

module.exports = router;
