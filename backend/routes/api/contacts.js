const express = require('express')
const { add } = require("../../controllers/contacts")
const { deleteById } = require("../../controllers/contacts")
const { getById } = require("../../controllers/contacts")
const { getAll } = require("../../controllers/contacts")
const { updateById } = require("../../controllers/contacts")
const { updateFavorite } = require("../../controllers/contacts")



const router = express.Router()

router.get("/", getAll);

router.get('/:contactId', getById)

router.post('/', add)

router.delete('/:contactId', deleteById)

router.put('/:contactId', updateById)

router.patch('/:contactId', updateFavorite)

module.exports = router
