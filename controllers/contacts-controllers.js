import contactsService from "../models/index.js";
import HttpError from "../helpers/HttpError.js";
import { controllersWrapper } from "../decorators/index.js";
import { contactAddSchema } from "../schemas/index.js";

const getAll = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.getContactById(contactId);
  if (!result) {
    throw HttpError(404, `Contact Id ${contactId} Not Found`);
  }
  res.json(result);
};

const addNew = async (req, res) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Contact Id ${contactId} Not Found`);
  }
  return res.status(200).json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
  const { error } = contactAddSchema.validate(req.body);

  const { contactId } = req.params;
  const result = await contactsService.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Contact Id ${contactId} Not Found`);
  }
  res.json(result);
};

export default {
  getAll: controllersWrapper(getAll),
  getById: controllersWrapper(getById),
  addNew: controllersWrapper(addNew),
  updateById: controllersWrapper(updateById),
  removeById: controllersWrapper(removeById),
};
