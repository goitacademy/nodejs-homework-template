const express = require('express');
const router = express.Router();
const auth = require('./auth');

const contactsController = require('./contacts.controller');
const usersController = require('./users.controller');

router.get('/contacts', contactsController.get);

router.get('/contacts/:id', contactsController.getById);

router.post('/contacts', contactsController.create);

router.put('/contacts/:id', contactsController.update);

router.patch('/contacts/:id/favorite', contactsController.updateStatus);

router.delete('/contacts/:id', contactsController.remove);


// users

// router.get('/users', usersController.getAll)

router.post('/users/signup', usersController.signUp)
router.post('/users/login',  usersController.login)
router.post('/users/logout', auth, usersController.logout)
router.get('/users/current', auth, usersController.current)

module.exports = router;