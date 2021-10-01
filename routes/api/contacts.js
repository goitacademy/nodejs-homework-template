const express = require('express');
const router = express.Router();

const {
  yupContactSchema,
  updateFavoriteYupSchema,
} = require('../../models/contact');
const { controllerWrapper, validation } = require('../../middlewares');
const ctrl = require('../../controllers/contacts');

router.get('/', controllerWrapper(ctrl.listContacts));

router.get('/:contactId', controllerWrapper(ctrl.getContactById));

router.post(
  '/',
  validation(yupContactSchema),
  controllerWrapper(ctrl.addContact),
);

router.delete('/:contactId', controllerWrapper(ctrl.removeContact));

router.put(
  '/:contactId',
  validation(yupContactSchema),
  controllerWrapper(ctrl.updateContact),
);

router.patch(
  '/:contactId/favorite',
  validation(updateFavoriteYupSchema),
  controllerWrapper(ctrl.updateStatusContact),
);

module.exports = router;
