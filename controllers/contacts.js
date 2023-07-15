import contacts from "../models/contacts.js";
import HttpError from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAllContacts = async (_, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContact(id);
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

const addNewContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const deleteContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) throw HttpError(404, "Not found");
  res.status(200).json({
    message: "contact deleted",
  });
};

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addNewContact: ctrlWrapper(addNewContact),
  deleteContactById: ctrlWrapper(deleteContactById),
  updateContactById: ctrlWrapper(updateContactById),
};