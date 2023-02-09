const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');
const { ControllersHelper, isValidId } = require('../../helpers');
const { authenticate } = require('../../middlewares');

router.get('/', authenticate, ControllersHelper(ctrl.getAll));

router.get(
  '/:id',
  authenticate,
  isValidId,
  ControllersHelper(ctrl.getContactById)
);

router.post('/', authenticate, ControllersHelper(ctrl.addContact));

router.delete(
  '/:id',
  authenticate,
  isValidId,
  ControllersHelper(ctrl.removeContact)
);

router.put(
  '/:id',
  authenticate,
  isValidId,
  ControllersHelper(ctrl.updateContact)
);

router.patch(
  '/:id/favorite',
  isValidId,
  ControllersHelper(ctrl.updateFavorite)
);

module.exports = router;
