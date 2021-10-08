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

router.get('/', getPosts);
router.get('/:contactId', validateId, getPostsDyId);
router.post('/', validateContact, addPosts);
router.delete('/:contactId', validateId, deletePosts);
router.put('/:contactId', validateId, validateContactsChange, changePosts);
router.patch('/:contactId', validateId, validateContactsChange, patchPosts);

module.exports = router;
