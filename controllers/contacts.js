import { nanoid } from "nanoid";

import contactsServices from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import { contactControllerWrap } from "../decorators/index.js";

const listContacts = async (req, res) => {
  const result = await contactsServices.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsServices.getContactById(id);
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

const addContact = async (req, res) => {
  const newContact = { id: nanoid(), ...req.body };
  const result = await contactsServices.addContact(newContact);
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsServices.removeContact(id);
  if (!result) throw HttpError(404, "Not found");
  res.json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { id, body } = req.params;
  const result = await contactsServices.updateContact(id, req.body);
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

export default {
  listContacts: contactControllerWrap(listContacts),
  getById: contactControllerWrap(getContactById),
  addContact: contactControllerWrap(addContact),
  removeContact: contactControllerWrap(removeContact),
  updateContact: contactControllerWrap(updateContact),
};
