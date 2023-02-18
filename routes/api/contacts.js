const express = require('express');
const router = express.Router();

const { contacts: ctrl } = require('../../controllers');
const {
  validation,
  ctrlWrapper,
  authenticate,
  isValidId,
} = require('../../middlewares');

const { schemas } = require('../../models/contact');

router.get('/', authenticate, ctrlWrapper(ctrl.getAll));

router.get(
  '/:id',
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.getContactById)
);

router.post(
  '/',
  authenticate,
  validation(schemas.joiContact),
  ctrlWrapper(ctrl.add)
);

router.put(
  '/:id',
  authenticate,
  isValidId,
  validation(schemas.joiContact),
  ctrlWrapper(ctrl.update)
);

router.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validation(schemas.joiStatus),
  ctrlWrapper(ctrl.updateStatus)
);

router.delete(
  '/:id',
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.removeContactById)
);

module.exports = router;
