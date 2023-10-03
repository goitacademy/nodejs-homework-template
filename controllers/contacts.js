import { ctrlErrorWrapper } from "../decorators/index.js";
import contactsService from "../models/contacts.js";

const getAll = async (req, res, next) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.getContactById(contactId);
  res.json(result);
};

const add = async (req, res, next) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.removeContact(contactId);
  res.json(result);
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.updateContact(contactId, req.body);
  res.json(result);
};

export default {
  getAll: ctrlErrorWrapper(getAll),
  getById: ctrlErrorWrapper(getById),
  add: ctrlErrorWrapper(add),
  deleteById: ctrlErrorWrapper(deleteById),
  updateById: ctrlErrorWrapper(updateById),
};
