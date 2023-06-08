const express = require('express');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require('../../models/contacts');

const {HttpError} = require('../../helpers')

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result)
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) throw HttpError(404, `Not found contact with id: ${contactId}`);
    res.json(result)
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const result = await addContact(req.body);
    // if (!result) throw HttpError(404, `Not found contact with id: ${contactId}`);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) throw HttpError(404, `Not found contact with id: ${contactId}`);
    res.json(result)
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) throw HttpError(404, `Not found contact with id: ${contactId}`);
    res.json(result);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
