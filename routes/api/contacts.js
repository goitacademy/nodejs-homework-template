const express = require('express');

const {
	getAll,
	getById,
	addContact,
	deleteById,
	updateById,
	updateStatusContact 
} = require('../../controllers/contacts-controller');

const isValidId = require('../../helpers/IsValidID')

const router = express.Router()

router.get('/', getAll)

router.get('/:id', isValidId, getById)

router.post('/', addContact)

router.delete('/:id', isValidId, deleteById)

router.put('/:id', isValidId, updateById)

router.patch('/:id/favorite', isValidId, updateStatusContact)

module.exports = router;