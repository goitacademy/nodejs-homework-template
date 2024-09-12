const express = require('express');
const router = express.Router();

const findContactById = require('../../controllers/contacts/findContactById');
const addContact = require('../../controllers/contacts/addContact');
const deleteContact = require('../../controllers/contacts/deleteContact');
const updateContact = require('../../controllers/contacts/updateContact');
const contactList = require('../../controllers/contacts/contactList');
const updateFavorite = require('../../controllers/contacts/updateFavorite');

const validate = require('../../middlewares/validator');
const isValidId = require('../../middlewares/isValidId');
const upload = require('../../middlewares/upload')

const schemas = require('../../shema/shema');
const { updateFavoriteSchema } = require('../../shema/shema');
const authenticate = require('../../middlewares/authenticate');


router.get('/', authenticate, contactList);

router.get('/:contactId', authenticate, isValidId, findContactById);

router.post('/',upload.single("avatars"), authenticate, validate.validate(schemas.addSchema), addContact);

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
