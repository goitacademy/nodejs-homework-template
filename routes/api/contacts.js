const express = require('express');
const router = express.Router();

const {
  validateContact,
  validateContactsChange,
  validateId,
} = require('./validation');
const {
  getPosts,
  getPostsDyId,
  addPosts,
  deletePosts,
  changePosts,
  patchPosts,
} = require('../../controllers/controllers');

router.get('/', getPosts);
router.get('/:contactId', validateId, getPostsDyId);
router.post('/', validateContact, addPosts);
router.delete('/:contactId', validateId, deletePosts);
router.put('/:contactId', validateId, validateContact, changePosts);
router.patch('/:contactId', validateId, validateContactsChange, patchPosts);

module.exports = router;
