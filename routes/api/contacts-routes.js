const express = require('express');

const contactController = require('../../controllers/contatcts-controller');

const router = express.Router();

const schemas = require('../../schemas/contactsSchema');

const { validateBody } = require('../../middlewares');

const { isValidId } = require('../../middlewares');

router.get('/', contactController.getAllContacts);

router.get('/:contactId', isValidId, contactController.getContatctById);

router.post(
  '/',
  validateBody(schemas.addSchema),
  contactController.addContatct
);

router.delete('/:contactId', isValidId, contactController.deleteContatctById);

router.put(
  '/:contactId',
  isValidId,
  validateBody(schemas.addSchema),
  contactController.updateContatctById
);

router.patch(
  '/:contactId/favourite',
  isValidId,
  validateBody(schemas.updateFavouriteSchema),
  contactController.updateStatusContact
);

module.exports = router;
