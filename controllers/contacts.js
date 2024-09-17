import {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
} from "../models/contacts.js";

import { HttpError, ctrlWrapper } from "../helpers/index.js";

const getAll = async (req, res, next) => {
  const allContacts = await listContacts();
  res.json(allContacts);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateById = async (req, res, next) => {
  if (JSON.stringify(req.body) === "{}") {
    throw HttpError(400, "missing fields");
  }

  const { contactId } = req.params;

  const result = await updateContact(contactId, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getContactById: ctrlWrapper(getContactById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
