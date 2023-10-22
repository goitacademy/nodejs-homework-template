import { ctrlErrorWrapper } from "../decorators/index.js";
import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/Contact.js";

const NotFoundIdError = (contactId) =>
  HttpError(404, `Contact with ${contactId} not found`);

const getAll = async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw NotFoundIdError(contactId);
  }

  res.json(result);
};

const add = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw NotFoundIdError(contactId);
  }

  res.json(result);
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw NotFoundIdError(contactId);
  }

  res.json(result);
};

export default {
  getAll: ctrlErrorWrapper(getAll),
  getById: ctrlErrorWrapper(getById),
  add: ctrlErrorWrapper(add),
  deleteById: ctrlErrorWrapper(deleteById),
  updateById: ctrlErrorWrapper(updateById),
};
