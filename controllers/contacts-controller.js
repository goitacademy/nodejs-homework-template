import contactsService from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import wrapController from "../decorators/controllerWrapper.js";

const getAll = async (req, res, next) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getByID = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.getContactByID(contactId);
  if (!result) {
    return next(HttpError(404, "Not found"));
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const deleteByID = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.removeContact(contactId);
  if (!result) {
    return next(HttpError(404, "Not found"));
  }
  res.json({ message: "contact deleted" });
};

const update = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.updateContactByID(contactId, req.body);
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
