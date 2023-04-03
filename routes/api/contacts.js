const express = require('express');
const {
  getContactsList,
  getById,
  addNewContact,
  deleteContact,
  updateStatusContact,
} = require('../../controllers/contactController');
const {
  bodyValidation,
  checkUserId,
  checkFavorite,
} = require('../../middliwares');
const { asyncCatch } = require('../../utils');

const router = express.Router();

router.get('/', asyncCatch(getContactsList));

router.get('/:contactId', checkUserId, asyncCatch(getById));

router.post('/', bodyValidation, asyncCatch(addNewContact));

router.delete('/:contactId', checkUserId, asyncCatch(deleteContact));

router.patch(
  '/:contactId/favorite',
  checkUserId,
  checkFavorite,
  asyncCatch(updateStatusContact)
);

module.exports = router;
