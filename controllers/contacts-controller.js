import * as contactsService from "../models/contacts.js";

import {
  contactsAddSchema,
  contactsUpdateSchema,
} from "../schemas/contacts-schemas.js";

import { HttpError } from "../helpers/index.js";

const getListContacts = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contacts with id=${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContactById = async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContactsById = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

const deleteContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contacts with id=${contactId} not found`);
    }
    res.json({
      message: "Contact deleted!",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getListContacts,
  getContactById,
  addContactById,
  updateContactsById,
  deleteContactById,
};
