import { contacts } from "../models/index.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  res.json(await contacts.listContacts());
};

const getById = async (req, res) => {
  const { contactId: id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found!`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { contactId: id } = req.params;
  const result = await contacts.updateContactById(id, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found!`);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { contactId: id } = req.params;
  const result = await contacts.removeContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found!`);
  }
  res.json({ message: "contact deleted" });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
