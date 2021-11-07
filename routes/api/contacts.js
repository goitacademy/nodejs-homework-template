const express = require('express');

const router = express.Router();

const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middlewares');
const { JoiSchema } = require('../../models/contact');
const { contacts: ctrl } = require('../../controllers');

router.get('/', authenticate, controllerWrapper(ctrl.listContacts));

router.get('/:id', authenticate, controllerWrapper(ctrl.getById));

router.post(
  '/',
  authenticate,
  validation(JoiSchema),
  controllerWrapper(ctrl.addContact)
);

router.delete('/:id', authenticate, controllerWrapper(ctrl.deleteContact));

router.post(
  '/:id/favorite',
  authenticate,
  controllerWrapper(ctrl.updateContact)
);

router.put(
  '/:id',
  authenticate,
  validation(JoiSchema),
  controllerWrapper(ctrl.updateContact)
);

module.exports = router;
