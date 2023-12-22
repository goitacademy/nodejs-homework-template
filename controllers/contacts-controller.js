import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/Contact.js";

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found `);
  }
  res.json(result);
};

const addContacts = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContactsById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

const delContactsById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.removeContact(id);
  if (!result) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }
  res.json({ message: "Delete success" });
};

export default {
  getAll: ctrlWrapper(getAllContacts),
  getByID: ctrlWrapper(getContactById),
  add: ctrlWrapper(addContacts),
  updateById: ctrlWrapper(updateContactsById),
  deleteById: ctrlWrapper(delContactsById),
};
