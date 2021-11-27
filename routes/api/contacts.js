const express = require('express');
const { validation, ctrlWrapper } = require('../../middlewares');
const { joiSchema, favoriteJoiSchema } = require('../../models/contact');
const { contacts: ctrl } = require('../../controllers');
const router = express.Router();

router.get('/', ctrlWrapper(ctrl.listContacts));
router.get('/:id', ctrlWrapper(ctrl.getContactById));
router.post('/', validation(joiSchema), ctrlWrapper(ctrl.addContact));
router.delete('/:id', ctrlWrapper(ctrl.removeContactById));
router.put('/:id', validation(joiSchema), ctrlWrapper(ctrl.updateContactById));
router.patch(
  '/:id/favorite',
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavoriteById),
);

module.exports = router;
