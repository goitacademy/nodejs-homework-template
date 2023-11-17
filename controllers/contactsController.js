import { Contact } from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const contacts = await Contact.find();

  res.json(contacts);
};

const getById = async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    throw HttpError(404, "Not found");
  }

  res.json(contact);
};

const add = async (req, res) => {
  const newContact = await Contact.create(req.body);

  res.status(201).json(newContact);
};

const deleteById = async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  if (!contact) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
  const { params, body } = req;

  const contact = await Contact.findByIdAndUpdate(params.id, body);

  if (!contact) {
    throw HttpError(404, "Not found");
  }

  res.json(contact);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
