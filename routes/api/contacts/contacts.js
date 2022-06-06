const express = require('express');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact, updateContact,
} = require('../../../models/contacts');
const {createError} = require("../../../helpers");
const { joiPostSchema, joiPutSchema } = require('./schemas');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const contact = await getContactById(contactId);
    if (!contact) throw createError(404);
    res.json(contact)
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = joiPostSchema.validate(req.body);
    if (error) throw createError(400, error.message);
    const contact = await addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const contact = await removeContact(contactId);
    if (!contact) throw createError(404);
    res.json({message: 'contact deleted'});
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const {error} = joiPutSchema.validate(req.body);
    if (error) throw createError(400, error.message);
    const contact = await updateContact(contactId, req.body);
    if (!contact) throw createError(404);
    res.json(contact);
  } catch (error) {
    next(error);
  }
})

module.exports = router
