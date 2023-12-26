import * as contactsService from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import {
  contactAddSchema,
  contactUpdateSchema,
} from "../schemas/contact-schemas.js";

import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const result = await contactsService.listContacts();

  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.getContactById(contactId);
  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.json(result);
};

const addContact = async (req, res) => {
  const result = await contactsService.addContact(req.body);

  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.json({
    message: "contact deleted",
  });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
};
