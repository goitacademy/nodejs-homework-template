import { HttpError } from "../helpers/index.js";
import { HTTP_STATUS } from "../constants/index.js";
import { controllerWrapper } from "../decorators/index.js";
import { Contact } from "../models/contacts.js";

const listContacts = async (req, res, next) => {
  const list = await Contact.find();
  res.json(list);
};

const addContact = async ({ body }, res, next) => {
  const result = await Contact.create(body);
  res.status(HTTP_STATUS.created).json(result);
};

const getContactById = async ({ params: { id } }, res, next) => {
  const result = await Contact.findById(id);
  if (!result) throw HttpError(HTTP_STATUS.notFound);
  res.json(result);
};

const updateContactById = async ({ body, params: { id } }, res) => {
  const result = await Contact.findByIdAndUpdate(id, body, { new: true });
  if (!result) throw HttpError(HTTP_STATUS.notFound);
  res.json(result);
};

const updateContactFavoriteById = async ({ body, params: { id } }, res) => {
  const result = await Contact.findByIdAndUpdate(id, body, { new: true });
  if (!result) throw HttpError(HTTP_STATUS.notFound);
  res.json(result);
};

const removeContactById = async ({ params: { id } }, res, next) => {
  const result = await Contact.findByIdAndDelete(id);
  if (!result) throw HttpError(HTTP_STATUS.notFound);
  res.json(result);
};

export const contactsController = {
  listContacts: controllerWrapper(listContacts),
  addContact: controllerWrapper(addContact),
  getContactById: controllerWrapper(getContactById),
  updateContactById: controllerWrapper(updateContactById),
  updateContactFavoriteById: controllerWrapper(updateContactFavoriteById),
  removeContactById: controllerWrapper(removeContactById),