const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.post('/blog', blogController.createBlogPost);

router.get('/blog', blogController.getAllBlogPosts);

router.get('/blog/:id', blogController.getBlogPostById);

router.patch('/blog/:id', blogController.updateBlogPost);

router.delete('/blog/:id', blogController.deleteBlogPost);

module.exports = router;
