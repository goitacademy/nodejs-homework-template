const express = require('express');
const contactsController = require('../../controllers/contacts-controller');
const schema = require('../../schemas/contacts');
const { validateBody } = require('../../decorators');
const { isValidId, authenticate } = require('../../middlewares');
const router = express.Router();

router.use(authenticate);

router.get('/', contactsController.getAllContacts);

router.get('/:contactId', isValidId, contactsController.getContactsById);

router.post('/', validateBody(schema.contactsSchema), contactsController.addContacts);

router.put('/:contactId', isValidId, validateBody(schema.contactsSchema), contactsController.updateContacts);
router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(schema.contactsUpdateFavoriteSchema),
  contactsController.updateContactsFavorite
);
router.delete('/:contactId', isValidId, contactsController.deleteContacts);

module.exports = router;
