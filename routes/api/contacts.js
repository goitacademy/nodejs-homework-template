const express = require('express')

const router = express.Router()

const {
  postValidation,
  putValidation
} = require('../../middlewares/walidationMiddleware')

const {
  getPosts,
  getPostsById,
  addPosts,
  deletePosts,
  updatePostsById
} = require('../../controllers/postsController')

router.get('/', getPosts)
router.get('/:contactId', getPostsById)
router.post('/', postValidation, addPosts)
router.delete('/:contactId', deletePosts)
router.put('/:contactId', putValidation, updatePostsById)

module.exports = router