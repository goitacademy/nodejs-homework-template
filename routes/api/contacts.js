const express = require('express');

const contactsController = require('../../controllers/contactsController');
const validation = require('../../middlewares/validation');
const tryCatchMiddleware = require('../../middlewares/tryCatchMiddleware');
const auth = require('../../middlewares/auth');
const { joiProduct, joiFavoriteField } = require('../../models/contact');

const router = express.Router();

router.get('/', auth, tryCatchMiddleware(contactsController.getAllContacts));

router.get(
  '/:contactId',
  auth,
  tryCatchMiddleware(contactsController.getOneContact),
);

router.post(
  '/',
  auth,
  validation(joiProduct),
  tryCatchMiddleware(contactsController.addContact),
);

router.delete(
  '/:contactId',
  auth,
  tryCatchMiddleware(contactsController.deleteContact),
);

router.put(
  '/:contactId',
  auth,
  validation(joiProduct),
  tryCatchMiddleware(contactsController.updateContact),
);

router.patch(
  '/:contactId/favorite',
  auth,
  validation(joiFavoriteField),
  tryCatchMiddleware(contactsController.updateFavouriteField),
);

module.exports = router;
