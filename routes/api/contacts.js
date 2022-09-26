const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/contacts');

const { ctrlWrapper } = require('../../helpers');

const {
  validateContactBody,
  isValidId,
  authenticate,
} = require('../../middlewares');

const { schemas } = require('../../models/contact');

router.get('/', authenticate, ctrlWrapper(ctrl.getContactsList));

router.get('/:id', authenticate, isValidId, ctrlWrapper(ctrl.getContactById));

router.post(
  '/',
  authenticate,
  validateContactBody(schemas.contactAddSchema),
  ctrlWrapper(ctrl.addContact)
);

router.delete('/:id', authenticate, isValidId, ctrlWrapper(ctrl.removeById));

router.put(
  '/:id',
  authenticate,
  isValidId,
  validateContactBody(schemas.contactAddSchema),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateContactBody(schemas.updFavorContactSchema),
  ctrlWrapper(ctrl.updFavorContact)
);

module.exports = router;
