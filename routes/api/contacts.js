const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts');

const { validateBody, isValidId } = require('../../middlewares');

const { schemas } = require('../../models/contact');

router.get('/', ctrl.getAll);

router.get('/:contactId', isValidId, ctrl.getById);

router.post('/', validateBody(schemas.addSchema), ctrl.addNew);

router.put(
  '/:contactId',
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

// router.path('/:contactId/favorite',isValidId, validateBody(schemas.addSchema), ctrl.updateById);

// router.delete('/:contactId',isValidId, ctrl.deleteById);

module.exports = router;
