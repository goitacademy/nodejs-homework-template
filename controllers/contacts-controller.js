import { ctrlWrapper } from "../decorators/index.js";

import contacts from "../models/contacts.js";

import HttpError from "../helpers/HttpError.js";

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with ID ${contactId} not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Contact with ID ${contactId} not found`);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Contact with ID ${contactId} not found`);
  }
  res.json({
    message: "Delete success",
  });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
