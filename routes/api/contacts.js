const express = require('express');
const ctrl = require('../../controllers/contactsControllers');
const { postValidation, putValidation } = require('../../validation');
const { authorizationMiddleware } = require('../../middleware');

const router = express.Router();

router.get('/', authorizationMiddleware, ctrl.getContactsList);

router.get('/:contactId', authorizationMiddleware, ctrl.getOneContact);

router.post('/', authorizationMiddleware, postValidation, ctrl.postContact);

router.delete('/:contactId', authorizationMiddleware, ctrl.delateContact);

router.put(
  '/:contactId',
  authorizationMiddleware,
  putValidation,
  ctrl.putContact
);

router.patch(
  '/:contactId/favorite',
  authorizationMiddleware,
  ctrl.patchFavorite
);

module.exports = router;
