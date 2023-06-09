const express = require('express')

const {getAll, getById, addContact, deleteById, updateById, updateStatusContact} = require('../../controllers')

const router = express.Router()

router.get("/", getAll);

router.get("/:contactId", isValidId, getById);

router.post("/", addContact);

router.delete("/:contactId", deleteById);

router.put("/:contactId", isValidId, updateById);

router.patch('/:id/favorite', isValidId, updateStatusContact)

module.exports = router;