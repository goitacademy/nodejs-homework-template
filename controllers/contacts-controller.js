import * as contactsService from "../models/contacts.js";

import {
  contactsAddSchema,
  contactsUpdateSchema,
} from "../schemas/contacts-schemas.js";

import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";

const getListContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.getContactById(contactId);
  if (!result) {
    throw HttpError(404, `Contacts with id=${contactId} not found`);
  }
  res.json(result);
};

const addContactById = async (req, res) => {
  const { error } = contactsAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const updateContactsById = async (req, res) => {
  const { error } = contactsUpdateSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { contactId } = req.params;
  const result = await contactsService.updateContactById(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Contacts with id=${contactId} not found`);
  }
  res.json(result);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Contacts with id=${contactId} not found`);
  }
  res.json({
    message: "Contact deleted!",
  });
};

export default {
  getListContacts: ctrlWrapper(getListContacts),
  getContactById: ctrlWrapper(getContactById),
  addContactById: ctrlWrapper(addContactById),
  updateContactsById: ctrlWrapper(updateContactsById),
  deleteContactById: ctrlWrapper(deleteContactById),
};
