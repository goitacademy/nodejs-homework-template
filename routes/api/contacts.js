const express = require('express');

const router = express.Router();

const ctrl = require('../../Controllers/contacts');

const {
  validateSchemeUpdContact,
  validateSchemeAddContact,
  isValidId,
  validateSchemeFavorContact,
} = require("../../Middlewares"); 

const {
  schemaContact,
  schemaUpdateContact
} = require('../../Service/schemas/contacts');

router.get('/', ctrl.listContacts);

router.get('/:id',
   isValidId,
  ctrl.getContactById);

router.post(
  "/",
  validateSchemeAddContact(schemaContact),
  ctrl.addContact);

router.delete('/:id', isValidId, ctrl.removeContact);

router.put(
  "/:id",
  isValidId,
  validateSchemeUpdContact(schemaContact),
  ctrl.updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateSchemeFavorContact(schemaUpdateContact),
  ctrl.updateStatus
);

module.exports = router
