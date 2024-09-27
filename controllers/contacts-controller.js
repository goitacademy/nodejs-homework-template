import {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContact,
} from "../models/contacts.js";
import bodyWrapper from "../decorators/bodyWrapper.js";
import HttpError from "../helpers/HTTPError.js";

const getAll = async (req, res) => {
  const result = await listContacts();
  return res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await removeContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json({
    message: "Delete success",
  });
};

const add = async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }
  res.json(result);
};

export default {
  getAll: bodyWrapper(getAll),
  getById: bodyWrapper(getById),
  add: bodyWrapper(add),
  updateById: bodyWrapper(updateById),
  deleteById: bodyWrapper(deleteById),
};
