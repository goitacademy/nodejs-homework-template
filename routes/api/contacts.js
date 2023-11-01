const router = require('express').Router();

const validateContact = require('../../middleware/validateBody');
const schemas = require('../../schemas/contactSchemas');
const isValidId = require('../../middleware/isValidId');
const contactsController = require('../../controllers/ContactsController');
const authenticate = require('../../middleware/authenticate');

router.get('/', authenticate, contactsController.getAll);

router.get('/:id', authenticate, isValidId, contactsController.getById);

router.post(
  '/',
  authenticate,
  validateContact(schemas.addContactSchema),
  contactsController.add
);

router.delete('/:id', authenticate, isValidId, contactsController.remove);

router.put(
  '/:id',
  authenticate,
  isValidId,
  validateContact(schemas.updateContactSchema),
  contactsController.update
);

router.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateContact(schemas.updateFavoriteSchema),
  contactsController.update
);

module.exports = router;
