const express = require('express');
const ctrl = require('../../controllers/contactsControllers');
const { postValidation, putValidation } = require('../../validation');
// const { authorizationMiddleware } = require('../../middleware');

const router = express.Router();

router.get('/', ctrl.getContactsList);

router.get('/:contactId', ctrl.getOneContact);

router.post('/', postValidation, ctrl.postContact);

router.delete('/:contactId', ctrl.delateContact);

router.put(
  '/:contactId',

  putValidation,
  ctrl.putContact
);

router.patch(
  '/:contactId/favorite',

  ctrl.patchFavorite
);

module.exports = router;
