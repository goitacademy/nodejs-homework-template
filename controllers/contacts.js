import { HttpError } from "../helpers/HttpError.js";
import { controllerWrapper } from "../decorators/index.js";
import { Contact } from "../models/Contact.js";

const getAll = async (req, res) => {
  const r = await Contact.find({});
  res.json(r);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const r = await Contact.findById(contactId);
  if (!r) {
    throw HttpError(404);
  }
  res.json(r);
};

const add = async (req, res) => {
  const r = await Contact.create(req.body);
  res.status(201).json(r);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const r = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!r) {
    throw HttpError(404);
  }
  res.json(r);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const r = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!r) {
    throw HttpError(404);
  }
  res.json(r);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const r = await Contact.findByIdAndRemove(contactId);
  if (!r) {
    throw HttpError(404);
  }
  res.json({ message: "contact deleted" });
};
export default {
  getAll: controllerWrapper(getAll),
  getById: controllerWrapper(getById),
  add: controllerWrapper(add),
  updateById: controllerWrapper(updateById),
  updateStatusContact: controllerWrapper(updateStatusContact),
  deleteById: controllerWrapper(deleteById),
};
