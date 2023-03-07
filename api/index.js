const express = require('express');
const router = express.Router();
const controllersContacts = require('../controllers')


router.get('/', controllersContacts.get)

router.get('/:id', controllersContacts.getById)

router.post('/', controllersContacts.create)

router.patch("/:id/status", controllersContacts.favorite)

// router.put('/:id', changeContact)

// router.patch('/:id/status', updateFavorite)

// router.delete('/:id', deliteContact)

module.exports = router