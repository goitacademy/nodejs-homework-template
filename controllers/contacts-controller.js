import Joi from 'joi';
import ctrlWrapper from '../decorators/ctrlWrapper.js';

import * as contactsService from '../models/index.js';
import HttpError from '../helpers/HttpError.js';

const contactAddSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const getAll = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);

  // res.status(500).json('Internal server error');
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    throw HttpError(404, 'Not Found');
    // const error = new Error('Not found');
    // error.status = 404;
    // throw error;
    // -------------------------------------------
    // return res.status(404).json({
    //   message: 'Not found',
    // });
  }
  res.json(result);

  // const { status = 500, message = 'Internal server error' } = error;
  // res.status(status).json({ message });

  // res.status(500).json(' res.status(500).json('Internal server error');');
};

const add = async (req, res) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, 'All fields are empty');
  }

  const { error } = contactAddSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    throw HttpError(404, message);
  }
  res.json({
    message: 'Delete success',
  });
};

const update = async (req, res) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, 'All fields are empty');
  }

  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const { id } = req.params;

  const result = await contactsService.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, 'Contact not found');
  }
  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  update: ctrlWrapper(update),
};
