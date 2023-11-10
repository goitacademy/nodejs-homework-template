import contactService from '../models/contacts.js';
import { HttpError } from '../helpers/index.js';
import Joi from 'joi';

const contactAddSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required name field' }),
  email: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required email field' }),
  phone: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required phone field' }),
});

const getAllContacts = async (req, res, next) => {
  try {
    const result = await contactService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactsById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
};
const updateContacts = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, 'missing fields');
    }
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contactService.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, 'Not found');
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllContacts,
  getContactsById,
  addContact,
  deleteContact,
  updateContacts,
};
