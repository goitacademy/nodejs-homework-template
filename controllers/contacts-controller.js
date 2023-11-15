import contactService from '../models/contacts.js';
import { HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';

const getAll = async (req, res) => {
  const result = await contactService.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactService.getContactById(contactId);
  if (!result) {
    throw HttpError(404, `Movie with id=${contactId} not found`);
  }
  res.json(result);
};

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactService.removeContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Movie with id=${contactId} not found`);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await contactService.addContact(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactService.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Movie with id=${contactId} not found`);
  }
  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  removeById: ctrlWrapper(removeById),
  addContact: ctrlWrapper(addContact),
  updateById: ctrlWrapper(updateById),
};
