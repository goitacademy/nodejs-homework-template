const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');
const {
  validationObjectId,
  validationCreateContact,
  validationQueryCat,
  validationUpdateContact,
  validationUpdateStatusContact,
} = require('./valid-contact-router');
const guard = require('../../helper/guard');
const subscription = require('../../helper/subscription');
const { UserSubscription } = require('../../helper/constants');

router.get('/', guard, validationQueryCat, ctrl.getAll);
router.post('/', guard, validationCreateContact, ctrl.createContact);

router.get(
  '/starter',
  guard,
  subscription(UserSubscription.STARTER),
  ctrl.onlySTARTER,
);

router.get('/pro', guard, subscription(UserSubscription.PRO), ctrl.onlyPRO);

router.get(
  '/business',
  guard,
  subscription(UserSubscription.BUSINESS),
  ctrl.onlyBUSINESS,
);

router.get('/:contactId', guard, validationObjectId, ctrl.getById);

router.put(
  '/:contactId',
  guard,
  validationUpdateContact,
  validationObjectId,
  ctrl.update,
);

router.patch(
  '/:contactId/favorite',
  guard,
  validationUpdateStatusContact,

  ctrl.updateStatus,
);
router.delete('/:contactId', guard, ctrl.remove);

module.exports = router;
