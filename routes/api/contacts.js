const express = require('express');

const contactsController = require('../../controllers/contactsController');
const validation = require('../../middlewares/validation');
const tryCatchMiddleware = require('../../middlewares/tryCatchMiddleware');
const { joiProduct, joiFavoriteField } = require('../../models/contact');

const router = express.Router();

router.get('/', tryCatchMiddleware(contactsController.getAllContacts));

router.get('/:contactId', tryCatchMiddleware(contactsController.getOneContact));

router.post(
  '/',
  validation(joiProduct),
  tryCatchMiddleware(contactsController.addContact),
);

router.delete(
  '/:contactId',
  tryCatchMiddleware(contactsController.deleteContact),
);

router.put(
  '/:contactId',
  validation(joiProduct),
  tryCatchMiddleware(contactsController.updateContact),
);

router.patch(
  '/:contactId/favorite',
  validation(joiFavoriteField),
  tryCatchMiddleware(contactsController.updateFavouriteField),
);

module.exports = router;
