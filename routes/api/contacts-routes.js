const express = require('express');

const contactController = require('../../controllers/contatcts-controller');

const router = express.Router();

const schemas = require('../../schemas/contactsSchema');

const { validateBody } = require('../../decorators');

router.get('/', contactController.getAllContacts);

router.get('/:contactId', contactController.getContatctById);

router.post(
  '/',
  validateBody(schemas.addSchema),
  contactController.addContatct
);

router.delete('/:contactId', contactController.deleteContatctById);

router.put(
  '/:contactId',
  validateBody(schemas.addSchema),
  contactController.updateContatctById
);

module.exports = router;
