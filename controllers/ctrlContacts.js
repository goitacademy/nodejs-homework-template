import Joi from 'joi';

import { httpError } from '../helpers/httpError.js';
import { listContacts, getContactById, removeContact, addContact, updateContact } from '../models/contacts.js';

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

export const getAllContacts = async (req, res, next) => {
  try {
    const result = await listContacts()
  res.json(result)
  } catch (error) {
    next(error)
  }
}

export const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw httpError(404, 'Not Found')
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const postContact = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
      if (error) {
        throw httpError(400, 'Missing required name field')
    }
    const result = await addContact(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
      if (!result) {
        throw httpError(404, 'Not found')
    }
    res.json({Message: "Contact deleted"})
  } catch (error) {
    next(error)
  }
}

export const changeContact = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
      if (error) {
        throw httpError(400, 'Missing fields')
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
}