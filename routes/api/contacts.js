const express = require('express');
const Joi = require('joi');
const { createError } = require('./errors');

const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../models/contacts');

const router = express.Router();

const schema = Joi.object({ name: Joi.string().required(), email: Joi.string().email().required(), phone: Joi.string().required() });



router.get('/', async (req, res, next) => {
  try {
   const contacts = await listContacts();
    res.json(contacts);
  } catch (e) {
    next(e);
  }
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
  const contact = await getContactById(id);
  if (!contact) {
    throw createError(404, "Not found");
  } else {
    res.json(contact);
  }
  } catch (e) {
    next(e);
  }
 

})

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
  } else {
      const newContact = await addContact(req.body);
      res.status(201).json(newContact);
  }
  } catch (e) {
    next(e);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
  const id = req.params.contactId;
    const contact = await removeContact(id);
    console.log(contact);
  if (!contact) {
    throw createError(404, "Not found");
  } else {
    res.status(201).json({ message: `contact with id ${id} has been deleted successfully` });
  }
  } catch (e) {
    next(e);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    } else {
      const id = req.params.contactId;
      const updatedContact = await updateContact(id, req.body);
      if (!updatedContact) {
        throw createError(404, "Not found");
      } else {
        res.json(updatedContact);
      }
    }
  } catch (e) {
    next(e);
  }
})

module.exports = router
