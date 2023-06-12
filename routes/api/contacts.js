const express = require('express');
const router = express.Router();

const findContactById = require('../../controllers/findContactById');
const addContact = require('../../controllers/addContact');
const deleteContact = require('../../controllers/deleteContact');
const updateContact = require('../../controllers/updateContact');
const contactList = require('../../controllers/contactList');
const validate = require('../../middlewares/validator');

const isValidId = require('../../middlewares/isValidId');
const updateFavorite = require('../../controllers/updateFavorite');
const schemas = require('../../shema/shema');
const { updateFavoriteSchema } = require('../../shema/shema');
const authenticate = require('../../middlewares/authenticate');

router.get('/', authenticate, contactList);

router.get('/:contactId', authenticate, isValidId, findContactById);

router.post('/', authenticate, validate.validate(schemas.addSchema), addContact);

router.delete('/:contactId', authenticate, isValidId, deleteContact);

router.put(
  '/:contactId',
  authenticate,
  isValidId,
  validate.validate(schemas.addSchema),
  updateContact
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validate.validateFavorite(updateFavoriteSchema),
  updateFavorite
);

module.exports = router;
