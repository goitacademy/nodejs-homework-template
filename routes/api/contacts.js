const express = require("express");
const controllers = require("../../controllers/contacts");
const { ctrlWrapper, validateBody } = require('../../helpers');
const schemas = require('../../schemas/contactSchema')

const router = express.Router();

router.get('/', ctrlWrapper(controllers.listContacts));

router.get('/:contactId', ctrlWrapper(controllers.getContactById));

router.post('/', validateBody(schemas.addSchema), ctrlWrapper(controllers.addContact));

router.put(
  '/:contactId',
  validateBody(schemas.addSchema),
  ctrlWrapper(controllers.updateContact)
);

router.delete('/:contactId', ctrlWrapper(controllers.removeContact));

router.patch(
  '/:contactId/favorite',
  validateBody(schemas.updFavoriteContactSchema),
  ctrlWrapper(controllers.updateStatusContact)
);

module.exports = router;
