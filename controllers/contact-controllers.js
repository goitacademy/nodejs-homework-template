import { HttpError } from '../helpers/index.js';
import Contact from '../models/contacts.js';

import { ctrlWrapper } from '../decorators/index.js';

const getAllContacts = async (req, res, next) => {
  const result = await Contact.find({});
  res.json(result);
};

const getContactsById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const addContact = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContacts = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const updateStatusContacts = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json({ message: 'contact deleted' });
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactsById: ctrlWrapper(getContactsById),
  addContact: ctrlWrapper(addContact),
  updateContacts: ctrlWrapper(updateContacts),
  updateStatusContacts: ctrlWrapper(updateStatusContacts),
  deleteContact: ctrlWrapper(deleteContact),
};
