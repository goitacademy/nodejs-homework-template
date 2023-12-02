import * as contactService from "../models/index.js";

import { HttpError } from "../helpers/index.js";
import {
  contactAddScheme,
  contactUpdateScheme,
} from "../schemas/contact-schemas.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const allContacts = async (req, res, next) => {
  const result = await contactService.listContacts();
  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactService.getContactById(id);
  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.json(result);
};

const add = async (req, res, next) => {
  const { error } = contactAddScheme.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contactService.addContact(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  const { error } = contactUpdateScheme.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { id } = req.params;
  const result = await contactService.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactService.removeContact(id);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json({ message: "contact deleted" });
};

export default {
  allContacts: ctrlWrapper(allContacts),
  getContactById: ctrlWrapper(getContactById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  removeContact: ctrlWrapper(removeContact),
};
