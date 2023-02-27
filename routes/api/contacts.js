const express = require('express');

const { restart } = require('nodemon');

const router = express.Router();

const ctrl = require('../../controllers/contacts');

const { ctrlWrapper } = require('../../routes/api/helpers');

const { validateBody, validateParams } = require('../../middlewares');

const { schemas } = require('../models/contact');

router.get('/', ctrlWrapper(ctrl.listContacts));

router.get('/:contactId', validateParams, ctrlWrapper(ctrl.getContactById));

router.post('/', validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', validateParams, ctrlWrapper(ctrl.removeContact));

router.patch(
  '/:contactId/favorite',
  validateParams,
  validateBody(schemas.updateFavoritSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.put(
  '/:contactId',
  validateParams,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;
