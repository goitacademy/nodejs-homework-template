const { Router } = require('express');

const {
  addContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
} = require('../../controllers/contacts');

const { contactSchema, updateContactSchema } = require('./schemas');

const { validateRequest, asyncWrapper } = require('../../helpers').middlewares;

const router = Router();

// CRUD - C

router.post('/', validateRequest(contactSchema), asyncWrapper(addContact));
router.get('/', asyncWrapper(getContacts));
router.get('/:id', asyncWrapper(getContact));
router.put(
  '/:id',
  validateRequest(updateContactSchema),
  asyncWrapper(updateContact),
);
router.delete('/:id', asyncWrapper(deleteContact));

module.exports = router;
