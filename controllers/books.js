import { HttpError } from "../helpers/index.js";
import contacts from "../models/contacts.js";
import { contactAddSchema, contactUpdateSchema } from "../schemas/contact-schemas.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAllContact = async (req, res) => {
  const result = await contacts.listContacts();
  res.json({ result });
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ result });
};

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ result });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ result });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ result });
};

export default {
  getAllContact: ctrlWrapper(getAllContact),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
