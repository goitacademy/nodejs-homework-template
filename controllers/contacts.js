import contactsService from "../models/contacts.js";

import { HttpError, ctrlWrapper } from "../helpers/index.js";

const getAll = async (_, res) => {
  const result = await contactsService.listContacts();

  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;

  const result = await contactsService.getContactById(contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const updateByid = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;

  const result = await contactsService.removeContact(contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.json({ message: "contact deleted" });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateByid: ctrlWrapper(updateByid),
  deleteById: ctrlWrapper(deleteById),
};
