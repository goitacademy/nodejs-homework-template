import { HttpError } from "../helpers/index.js";
import contacts from "../models/contacts.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAllContact = async (req, res) => {
  const result = await contacts.listContacts();
  res.status(200).json( result );
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result );
};

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  if (!result) {
    throw HttpError(400, "missing required name field");
  }
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({"message": "contact deleted"});
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json( result);
};

export default {
  getAllContact: ctrlWrapper(getAllContact),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
