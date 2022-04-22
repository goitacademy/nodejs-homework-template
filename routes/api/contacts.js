const express = require('express');
const CreateError = require('http-errors');

const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
} = require('../../models/contacts');

const { reqValidateMid } = require('./validate');
const { newContactSchema, updateContactSchema } = require('./schemas');

const router = express.Router();

router.post('/', reqValidateMid(newContactSchema), async (req, res, next) => {
  const contact = await addContact(req.body);
  res.status(201).send(contact);
});

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).send(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact) {
      next(new CreateError.NotFound('Contact not found'));
      return;
    }
    res.status(200).send(contact);
  } catch (error) {
    next(error);
  }
});

router.put(
  '/:contactId',
  reqValidateMid(updateContactSchema),
  async (req, res, next) => {
    try {
      const contact = await updateContact(req.params.contactId, req.body);
      res.status(200).send(contact);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:contactId', async (req, res, next) => {
  try {
    const isContactDeleted = await removeContact(req.params.contactId);
    if (!isContactDeleted) {
      next(new CreateError.NotFound('Contact not found'));
      return;
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
