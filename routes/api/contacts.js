const express = require('express');
const { validateBody } = require('../../middlewares');
const { addSchema, updateSchema } = require('../../schemas/contacts');
const {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
} = require('../../controllers/contacts');

const router = express.Router();

router.get('/', getAll);

router.get('/:contactId', getById);

router.post('/', validateBody(addSchema), add);

router.delete('/:contactId', deleteById);

router.put('/:contactId', validateBody(updateSchema), updateById);

module.exports = router;
