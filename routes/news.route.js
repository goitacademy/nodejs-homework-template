const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

router.post('/news', newsController.createNews);

router.get('/news', newsController.getAllNews);

router.get('/news/:id', newsController.getNewsById);

router.patch('/news/:id', newsController.updateNews);

router.delete('/news/:id', newsController.deleteNews);

module.exports = router;
