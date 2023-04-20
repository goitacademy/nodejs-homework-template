const express = require('express');
const {
  getAll,
  getById,
  add,
  deleteContact,
  update,
} = require('../../controllers/contacts');

const schemas = require('../../schemas/contacts');
const validateBody = require('../../middlewares/validateBody');

const router = express.Router();

router.get('/', getAll);

router.get('/:contactId', getById);

router.post('/', validateBody(schemas.addSchema), add);

router.delete('/:contactId', deleteContact);

router.put('/:contactId', validateBody(schemas.addSchema), update);

module.exports = router;
