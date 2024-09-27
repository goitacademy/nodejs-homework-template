const express = require('express');

// contacts controllers
const ctrl = require('../../controllers/contacts');

// try-catch wrapper
const { ctrlWrapper } = require('../../helpers');

// validate request body and ID
const { auth, validateBody, isValidId } = require('../../middlewares');

// Joi validate Schema
const { joiContactSchema } = require('../../models/contact');

const router = express.Router();

router.get('/', auth, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', auth, isValidId, ctrlWrapper(ctrl.getById));

router.post(
  '/',
  auth,
  validateBody(joiContactSchema.addSchema),
  ctrlWrapper(ctrl.add)
);

router.put(
  '/:contactId',
  auth,
  isValidId,
  validateBody(joiContactSchema.addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  '/:contactId/favorite',
  auth,
  isValidId,
  validateBody(joiContactSchema.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete('/:contactId', auth, ctrlWrapper(ctrl.removeById));

module.exports = router;
