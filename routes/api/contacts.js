const express = require('express');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  res.json({
    status: 'success',
    code: 200,
    data: { result: await listContacts() },
  });
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id=${contactId} not found`,
    });
  }
  res.json({
    status: 'success',
    code: 200,
    data: { result: contact },
  });
});

router.post('/', async (req, res, next) => {
  res.status(201).json({
    status: 'success',
    code: 201,
    data: { result: await addContact(req.body) },
  });
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  res.json({
    status: 'success',
    code: 201,
    data: { result: await removeContact(contactId) },
  });
});

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  res.json({
    status: 'success',
    code: 201,
    data: { result: await updateContact(contactId, req.body) },
  });
});

module.exports = router;
