import { HttpError } from "../helpers/index.js";
import wrapController from "../decorators/controllerWrapper.js";
import Contact from "../models/Contact.js";

const getAll = async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
};

const getByID = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    return next(HttpError(404, "Not found"));
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteByID = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    return next(HttpError(404, "Not found"));
  }
  res.json({ message: "contact deleted" });
};

const update = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    return next(HttpError(404, "Not found"));
  }
  res.json(result);
};

export default {
  getAll: wrapController(getAll),
  getByID: wrapController(getByID),
  add: wrapController(add),
  deleteByID: wrapController(deleteByID),
  update: wrapController(update),
};
