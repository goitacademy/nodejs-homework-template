import contactsService from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import { CtrlWrapper } from "../decorators/index.js";

import Joi from "joi";

const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required name field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required phone field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required email field`,
  }),
});

// * Get ALL
const getAll = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

// * Get by ID
const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.getContactById(contactId);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

// * Post NEW
const add = async (req, res) => {
  const result = await contactsService.addContact(req.body);
  if (!result) throw HttpError(404, "missing required name field");
  res.status(201).json(result);
};

// * Delete
const removeById = async (req, res) => {
  const result = await contactsService.removeContact(req.params.contactId);
  if (!result) throw HttpError(404);
  res.json({ message: "contact deleted" });
};

// *Update
const updateById = async (req, res, next) => {
  const result = await contactsService.updateContact(
    req.params.contactId,
    req.body
  );
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

export default {
  getAll: CtrlWrapper(getAll),
  updateById: CtrlWrapper(updateById),
  removeById: CtrlWrapper(removeById),
  add: CtrlWrapper(add),
  getById: CtrlWrapper(getById),
};
