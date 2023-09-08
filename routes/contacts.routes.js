const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contacts.controller');
const Auth = require('../middlewares/auth')

router.get('/contacts', Auth, contactController.get);


router.get('/contacts/:id', Auth, contactController.getById);


router.post('/contacts', Auth, contactController.create);


router.put('/contacts/:id', Auth, contactController.update);


router.patch('/contacts/:id/favorite', Auth, contactController.updateFavorite);


router.delete('/contacts/:id', Auth, contactController.remove);


module.exports = router