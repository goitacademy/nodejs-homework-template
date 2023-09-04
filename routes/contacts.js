const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');

const getAll = require('../controllers/contacts/getAll.js');
const getById = require('../controllers/contacts/getById.js');
const addContact = require('../controllers/contacts/addContact.js');
const updateContact = require('../controllers/contacts/updateContact.js');
const deleteContact = require('../controllers/contacts/deleteContact.js');
const updateFavorite = require('../controllers/contacts/updateFavorite.js');

router.get('/', auth, getAll);

router.get('/:id', auth, getById);

router.post('/', auth, addContact);

router.put('/:id', auth, updateContact);

router.delete('/:id', auth, deleteContact);

router.patch('/:id/favorite', auth, updateFavorite);

module.exports = router;


