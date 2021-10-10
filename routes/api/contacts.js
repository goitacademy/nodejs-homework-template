const express = require('express');
const router = express.Router();

const {
  yupContactSchema,
  updateFavoriteYupSchema,
} = require('../../models/contact');
const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middlewares');
const ctrl = require('../../controllers/contacts');

router.get('/', authenticate, controllerWrapper(ctrl.listContacts));

router.get('/:contactId', authenticate, controllerWrapper(ctrl.getContactById));

router.post(
  '/',
  authenticate,
  validation(yupContactSchema),
  controllerWrapper(ctrl.addContact),
);

router.delete(
  '/:contactId',
  authenticate,
  controllerWrapper(ctrl.removeContact),
);

router.put(
  '/:contactId',
  authenticate,
  validation(yupContactSchema),
  controllerWrapper(ctrl.updateContact),
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  validation(updateFavoriteYupSchema),
  controllerWrapper(ctrl.updateStatusContact),
);

module.exports = router;
