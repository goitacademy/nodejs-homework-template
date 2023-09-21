const express = require('express')
const router = express.Router()
const ctrlContact = require('../../controller/index')

// GET /api/contacts
router.get('/', ctrlContact.get)

// GET /api/contacts/:id
router.get('/:contactId', ctrlContact.getById)

// POST /api/contacts
router.post('/', ctrlContact.add)

// DELETE /api/contacts/:id
router.delete('/:contactId', ctrlContact.remove)

// PUT /api/contacts/:id
router.put('/:contactId', ctrlContact.update)

// PATCH / api / contacts /: contactId / favorite
router.patch('/:contactId/favorite', ctrlContact.updateStatus)

module.exports = router;

