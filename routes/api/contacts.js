const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');
const { ControllersHelper, isValidId } = require('../../helpers');

router.get('/', ControllersHelper(ctrl.getAll));

router.get('/:id', isValidId, ControllersHelper(ctrl.getContactById));

router.post('/', ControllersHelper(ctrl.addContact));

router.delete('/:id', isValidId, ControllersHelper(ctrl.removeContact));

router.put('/:id', isValidId, ControllersHelper(ctrl.updateContact));

router.patch(
  '/:id/favorite',
  isValidId,
  ControllersHelper(ctrl.updateFavorite)
);

module.exports = router;
