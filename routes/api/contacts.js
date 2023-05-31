const express = require('express');
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

const HttpError = require('../../helpers/HttpError');
const { contactsAddSchema } = require('../../schemas/contacts');

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await getContactById(contactId);
    if (!result) throw HttpError(404);

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const newContacts = await addContact(req.body);
    res.status(201).json(newContacts);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) throw HttpError(404);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (Object.keys(req.body).length === 0) throw HttpError(400);
    const result = await updateContact(contactId, req.body);
    if (!result) throw HttpError(404);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
