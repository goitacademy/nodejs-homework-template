const { Router } = require('express');

const { controller } = require('../../controllers/contacts');
const {
  catchError,
  validateRequest,
} = require('../../helpers/contacts/middlewares');
const { schema } = require('../../helpers/contacts/schemas');

const router = Router();

router.post(
  '/',
  validateRequest(schema.contact),
  catchError(controller.addContact),
);
router.get('/', catchError(controller.getContacts));
router.get(
  '/:id',
  validateRequest(schema.id, 'params'),
  catchError(controller.getContact),
);
router.put(
  '/:id',
  validateRequest(schema.id, 'params'),
  validateRequest(schema.updateContact),
  catchError(controller.updateContact),
);
router.patch(
  '/:id/favorite',
  validateRequest(schema.id, 'params'),
  validateRequest(schema.updateStatusContact),
  catchError(controller.updateContact),
);
router.delete(
  '/:id',
  validateRequest(schema.id, 'params'),
  catchError(controller.deleteContact),
);

module.exports = router;
