const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../../model/index');
const {
  schemaCreateContact,
  schemaUpdateContact,
  schemaStatusContact,
} = require('./validation');

router.get('/', async (_req, res, next) => {
  try {
    const contacts = await listContacts();
    return res
      .status(200)
      .json({ status: 'success', code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.contactId)) {
      return res.status(400).json({ message: 'invalid contactId value' });
    }
    const contact = await getContactById(req.params.contactId);

    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' });
  } catch (error) {
    next(error);
  }
});

router.post('/', schemaCreateContact, async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    return res
      .status(201)
      .json({ status: 'success', code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.contactId)) {
    return res.status(400).json({ message: 'invalid contactId value' });
  }
  try {
    const contact = await removeContact(req.params.contactId);
    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', schemaUpdateContact, async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.contactId)) {
    return res.status(400).json({ message: 'invalid contactId value' });
  }
  try {
    const contact = await updateContact(req.params.contactId, req.body);
    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' });
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:contactId/favorite',
  schemaStatusContact,
  async (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.contactId)) {
      return res.status(400).json({ message: 'invalid contactId value' });
    }
    try {
      if (!req.body) {
        return res.status(400).json({ message: 'missing field favorite' });
      }
      const contact = await updateStatusContact(req.params.contactId, req.body);
      if (contact) {
        return res
          .status(200)
          .json({ status: 'success', code: 200, data: { contact } });
      }
      return res
        .status(404)
        .json({ status: 'error', code: 404, message: 'Not Found' });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
