const express = require('express');

const {
  getAll,
  getContact,
  createContact,
  deleteContact,
  renewContact,
} = require('../../controllers/contacts');

const router = express.Router();

const { validateBody } = require('../../middlewares');

const { AddSchema, AddSchemaRequired } = require('../../schemas/contacts');

router.get('/', getAll);

router.get('/:contactId', getContact);

router.post('/', validateBody(AddSchemaRequired), createContact);

router.delete('/:contactId', deleteContact);

router.put('/:contactId', validateBody(AddSchema), renewContact);

module.exports = router;
