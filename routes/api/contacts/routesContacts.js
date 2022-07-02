const { Router } = require('express');
const { ContactsController } = require('../../../controllers');
const { validationWraperSchema, validateQuery, validateId, guard } = require('../../../middlewares');
const {
  createJoiSchema,
  updateJoiSchema,
  updateFavoriteJoiSchema,
  queryJoiSchema,
} = require('../../../models/contact');

const router = new Router();

router.get('/', [guard, validateQuery(queryJoiSchema)], ContactsController.getContactsList);

router.get('/:contactId', [guard, validateId], ContactsController.getContactsById);

router.post('/', [guard, validationWraperSchema(createJoiSchema)], ContactsController.addContact);

router.delete('/:contactId', [guard, validateId], ContactsController.removeContactById);

router.put(
  '/:contactId',
  [guard, validateId, validationWraperSchema(updateJoiSchema)],
  ContactsController.updateContactById,
);

router.patch(
  '/:contactId/favorite',
  guard,
  validationWraperSchema(updateFavoriteJoiSchema),
  ContactsController.updateStatusContact,
);

module.exports = router;
