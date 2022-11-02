const express = require('express');

const { auth, validation, ctrlWrapper } = require('../../middlewares');
const { joiSchema, favoriteJoiSchema } = require('../../models/contact');
const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', auth, ctrlWrapper(ctrl.getListContacts));

router.get('/:contactId', ctrlWrapper(ctrl.getContactById));

router.post('/', auth, validation(joiSchema), ctrlWrapper(ctrl.postAddContact));

router.delete('/:contactId', ctrlWrapper(ctrl.deleteContactById));

router.put('/:contactId', validation(joiSchema), ctrlWrapper(ctrl.putUpdateById));

router.patch(
  '/:contactId/favorite',
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact),
);

module.exports = router;
