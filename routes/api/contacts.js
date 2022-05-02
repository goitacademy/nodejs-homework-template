const { Router } = require('express');

const { controller } = require('../../controllers/contacts');
const {
  ctrlWrapper,
  validateRequest,
} = require('../../helpers/contacts/middlewares');
const { schema } = require('../../helpers/contacts/schemas');

const router = Router();

router.post(
  '/',
  validateRequest(schema.contact),
  ctrlWrapper(controller.addContact),
);
router.get('/', ctrlWrapper(controller.getContacts));
router.get(
  '/:id',
  validateRequest(schema.id, 'params'),
  ctrlWrapper(controller.getContact),
);
router.put(
  '/:id',
  validateRequest(schema.id, 'params'),
  validateRequest(schema.updateContact),
  ctrlWrapper(controller.updateContact),
);
router.patch(
  '/:id/favorite',
  validateRequest(schema.id, 'params'),
  validateRequest(schema.updateStatusContact),
  ctrlWrapper(controller.updateContact),
);
router.delete(
  '/:id',
  validateRequest(schema.id, 'params'),
  ctrlWrapper(controller.deleteContact),
);

module.exports = router;
