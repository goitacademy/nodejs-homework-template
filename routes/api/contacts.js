const express = require('express');
const router = express.Router()

const {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
} = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");
const {addSchemas} = require("../../schemas/contacts");

router.get('/', getAll)

router.get('/:contactId', getById)

router.post('/', validateBody(addSchemas), add)

router.delete('/:contactId', deleteById)

router.put('/:contactId', validateBody(addSchemas), updateById)

module.exports = router
