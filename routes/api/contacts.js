const router = require('express').Router();

const validateContact = require('../../middleware/validateContact');
const schemas = require('../../schemas/contactSchemas');
const isValidId = require('../../middleware/isValidId');
const contactsController = require('../../controllers/contact/ContactsController');

router.get('/', contactsController.getAll);

router.get('/:id', isValidId, contactsController.getById);

router.post(
  '/',
  validateContact(schemas.addContactSchema),
  contactsController.add
);

router.delete('/:id', isValidId, contactsController.remove);

router.put(
  '/:id',
  isValidId,
  validateContact(schemas.updateContactSchema),
  contactsController.update
);

router.patch(
  '/:id/favorite',
  isValidId,
  validateContact(schemas.updateFavoriteSchema),
  contactsController.update
);

module.exports = router;
