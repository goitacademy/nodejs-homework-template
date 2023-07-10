const express = require('express');

const router = express.Router();

const ctrl = require('../../Controllers/contacts');

const validate = require('../../Middlewares/validateContacts'); 

const schema = require('../../Schemas/schemeContact');

router.get('/', ctrl.listContacts);

router.get('/:id', ctrl.getContactById);

router.post(
  "/",
  validate.validateSchemeAddContact(schema.schemaContact),
  ctrl.addContact
);

router.delete('/:id', ctrl.removeContact);

router.put(
  '/:id',
  validate.validateSchemeUpdContact(schema.schemaContact),
  ctrl.updateContact
);

module.exports = router
