const express = require('express');
const { queries } = require('../../models/contacts');
const { createBodyValidator } = require('../../middleware');
const { joiSchema, addToFavorites } = require('../../models/joi');

const router = express.Router();

const CONTACTS_PATH = '/';
const CONTACT_ID_PATH = '/:contactId';
const FAVORITE_PATH = '/:contactId/favorite';

router.get(CONTACTS_PATH, queries.listContacts);

router.get(CONTACT_ID_PATH, queries.getContactById);

router.post(CONTACTS_PATH, createBodyValidator(joiSchema), queries.addContact);

router.delete(CONTACT_ID_PATH, queries.removeContact);

router.put(
  CONTACT_ID_PATH,
  createBodyValidator(joiSchema),
  queries.updateContact
);

router.patch(
  FAVORITE_PATH,
  createBodyValidator(addToFavorites),
  queries.addToFavorites
);

module.exports = router;