import Joi from 'joi';

import contactsServise from '../models/contacts.js';

import { ctrlWrapper } from '../decorators/index.js';
import { HttpError } from '../helpers/index.js';

const contactsAddSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({ 'any.required': `missing required name field` }),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({ 'any.required': `missing required email field` }),
  phone: Joi.string()
    .required()
    .messages({ 'any.required': `missing required phone field` }),
});

const getContactsList = async (req, res) => {
  const result = await contactsServise.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsServise.getContactById(contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const addNewContact = async (req, res) => {
  const { error } = contactsAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contactsServise.addContact(req.body);
  res.status(201).json(result);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsServise.removeContact(contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    message: 'contact deleted',
  });
};

const updateContactById = async (req, res) => {
  const { error } = contactsAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, 'missing fields');
  }
  const { contactId } = req.params;
  const result = await contactsServise.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export default {
  getContactsList: ctrlWrapper(getContactsList),
  getContactById: ctrlWrapper(getContactById),
  addNewContact: ctrlWrapper(addNewContact),
  deleteContactById: ctrlWrapper(deleteContactById),
  updateContactById: ctrlWrapper(updateContactById),
};
