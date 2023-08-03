const express = require('express');
const ctrl = require('../../controllers/contacts');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { addSchema, updateFavoriteSchema } = require('../../models/contact');
const router = express.Router();

router.get('/', authenticate, ctrl.getAll);
router.get('/:contactId', authenticate, isValidId, ctrl.getById);
router.post('/', authenticate, validateBody(addSchema), ctrl.add);
router.delete('/:contactId', authenticate, isValidId, ctrl.deleteById);
router.put('/:contactId', authenticate, isValidId, validateBody(addSchema), ctrl.updateById);
router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
