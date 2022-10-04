const express = require('express');
// const { json } = require('express/lib/response');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

const { createReject } = require('../../utils');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw createReject(404, `contact with id ${contactId} not found`);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, phone, email } = req.body;
    if (!name || !phone || !email) {
      throw createReject(400, `Bad Request name, phone, email is required`);
    }
    const result = await addContact({ name, phone, email });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw createReject(400, `Bad Request id ${contactId} not found`);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      throw createReject(400, `Bad Request id ${contactId} not found`);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
