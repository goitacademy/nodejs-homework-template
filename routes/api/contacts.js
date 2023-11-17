const express = require('express');
const controllers = require('../../controllers/contactsControllers');
const { validateBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', controllers.getAll);

router.get('/:contactId', isValidId, controllers.getById);

router.post(
  '/',
  validateBody(schemas.createContactValidationSchema),
  controllers.add
);

router.put(
  '/:contactId',
  isValidId,
  validateBody(schemas.updateContactValidationSchema),
  controllers.updateById
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controllers.updateStatusContact
);

router.delete('/:contactId', controllers.deleteById);

module.exports = router;
