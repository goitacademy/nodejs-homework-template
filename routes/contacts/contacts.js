const express = require('express');
const router = express.Router();
const {
  validateContact,
  validateContactsChange,
  validateId,
} = require('../../validation/validationContact');
const {
  getPosts,
  getPostsDyId,
  addPosts,
  deletePosts,
  changePosts,
  patchPosts,
} = require('../../controllers/controllerContacts');
const guard = require('../../helpers/guard');
const wrapper = require('../../helpers/errorHandler');

router.get('/', guard, wrapper(getPosts));
router.get('/:contactId', guard, validateId, wrapper(getPostsDyId));
router.post('/', guard, validateContact, wrapper(addPosts));
router.delete('/:contactId', guard, validateId, wrapper(deletePosts));
router.put(
  '/:contactId',
  guard,
  validateId,
  validateContactsChange,
  wrapper(changePosts),
);
router.patch(
  '/:contactId',
  guard,
  validateId,
  validateContactsChange,
  wrapper(patchPosts),
);

module.exports = router;
