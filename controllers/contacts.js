import contactService from '../models/contacts.js';
import { HttpError } from '../helpers/index.js';
import { ctrlContactWrapper } from '../decorators/index.js';

const getAll = async (req, res) => {
  const result = await contactService.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contactService.getContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with id = ${id} not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await contactService.addContact(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await contactService.updateContactById(id, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id = ${id} not found`);
  }
  res.status(200).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await contactService.removeContact(id);
  if (!result) {
    throw HttpError(404, `Contact with id = ${id} not found`);
  }
  res.json({ message: 'Delete success' });
};
export default {
  getAll: ctrlContactWrapper(getAll),
  getById: ctrlContactWrapper(getById),
  add: ctrlContactWrapper(add),
  updateById: ctrlContactWrapper(updateById),
  deleteById: ctrlContactWrapper(deleteById),
};
