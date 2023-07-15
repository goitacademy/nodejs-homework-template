const express = require('express');

const {
  getContactsList,
  getById,
  addContact,
  removeContact,
  updateContact,
  isFavoriteById,
  updateFavorite,
} = require('../../controllers/contactsControllers.js');

const {
  checkContactById,
  checkContactInput,
  checkFavoriteInput,
} = require('../../middlewares/contactsMiddlewares.js');
const { authMiddleware } = require('../../middlewares/authMiddleware.js');

const router = express.Router();
router.use(authMiddleware);

router.route('/').get(getContactsList).post(checkContactInput, addContact);

router.use('/:contactId', checkContactById);
router
  .route('/:contactId')
  .get(getById)
  .delete(removeContact)
  .put(checkContactInput, updateContact);

router.route('/:contactId/favorite').get(isFavoriteById).put(checkFavoriteInput, updateFavorite);

module.exports = router;
