import express from 'express';
import Joi from 'joi';

import {listContacts, getContactById, removeContact, addContact,updateContact } from '../../models/contacts.js';

export const router = express.Router()

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts()
  res.json(result)
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    })
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      const err = new Error;
      err.status = 404;
      throw err
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      const err = new Error;
      err.status = 400;
      err.message = "missing required name field"
      throw err
    }
    const result = await addContact(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      const err = new Error;
      err.status = 404;
      throw err
    }
    res.json({Message: "Contact deleted"})
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      const err = new Error;
      err.status = 400;
      err.message = "missing fields"
      throw err
    }
    const { contactId } = req.params;
    const result = updateContact(contactId, req.body);
    if (!result) {
      const err = new Error;
      err.status = 404;
      throw err
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})