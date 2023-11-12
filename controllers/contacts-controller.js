import { HttpError } from "../helpers/index.js";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
} from "../models/contacts.js";

export const contactsGet = async (req, res, next) => {
  const data = await listContacts();
  res.json(data);
};

export const contactGetById = async (req, res, next) => {
  const id = req.params.contactId;
  const data = await getContactById(id);
  if (!data) {
    return next(HttpError(404, "Not found"));
  }
  res.json(data);
};

export const add = async (req, res, next) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};

export const remove = async (req, res, next) => {
  const id = req.params.contactId;
  const result = await removeContact(id);
  if (!result) {
    return next(HttpError(404, "Not found"));
  }
  res.status(200).json({ message: "Contact deleted" });
};

export const updateById = async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;
  const result = await updateContact(id, body);
  if (!result) {
    return next(HttpError(404, "Not found"));
  }
  res.status(200).json(result);
};
