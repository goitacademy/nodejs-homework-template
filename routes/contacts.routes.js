const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contacts.controller');

router.get('/contacts', contactController.get);

router.get('/contacts/:id', contactController.getById);

router.post('/contacts', contactController.create);

router.put('/contacts/:id', contactController.update);

router.patch('/contacts/:id/favorite', contactController.updateFavorite);

router.delete('/contacts/:id', contactController.remove);

module.exports = router