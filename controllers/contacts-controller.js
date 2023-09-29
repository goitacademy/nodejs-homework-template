import { HttpError } from "../helpers/index.js";
import { contactsService } from "../models/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import { addSchema, updateSchema } from "../schemas/contacts-schemas.js";

const getAll = async (req, res, next) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.getContactById(contactId);
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

const add = async (req, res, next) => {
  //   const { body } = req;
  //   const { error } = addSchema.validate(body);
  //   if (error) throw HttpError(400, error.message);
  const result = await contactsService.addContact(body);
  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  //   const { body } = req;
  const { contactId } = req.params;

  //   const { error } = updateSchema.validate(body);
  //   if (error) throw HttpError(400, error.message);

  const result = await contactsService.updateContact(contactId, body);
  if (!result) throw HttpError(404, "Not found");

  res.json(result);
  // res.status(200).json(result);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.removeContact(contactId);
  if (!result) throw HttpError(404, "Not found");
  // res.json(result);
  res.json({ message: "contact deleted" });
  // res.status(200).json({ message: "contact deleted" });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
