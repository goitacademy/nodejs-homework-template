const express = require('express');

const {
	getAll,
	getById,
	addContact,
	deleteById,
	updateById,
	updateStatusContact 
} = require('../../controllers/contacts-controller');

const {addSchema} = require('../../schemas/contacts');

const { isValidId } = require('../../helpers')

const router = express.Router()

router.get('/', getAll)

router.get('/:id', isValidId, getById)

router.post('/', addContact)

router.delete('/:contactId', isValidId, deleteById)

router.put('/:contactId', isValidId, updateById)

router.patch('/:contactId/favorite', isValidId, updateStatusContact)

module.exports = router;