const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/contacts');

const { ctrlWrapper } = require('../../helpers');

const { validateContactBody, isValidId } = require('../../middlewares');

const { schemas } = require('../../models/contact');

router.get('/', ctrlWrapper(ctrl.getContactsList));

router.get('/:id', isValidId, ctrlWrapper(ctrl.getContactById));

router.post(
  '/',
  validateContactBody(schemas.contactAddSchema),
  ctrlWrapper(ctrl.addContact)
);

router.delete('/:id', isValidId, ctrlWrapper(ctrl.removeById));

router.put(
  '/:id',
  isValidId,
  validateContactBody(schemas.contactAddSchema),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  '/:id/favorite',
  isValidId,
  validateContactBody(schemas.updFavorContactSchema),
  ctrlWrapper(ctrl.updFavorContact)
);

module.exports = router;
