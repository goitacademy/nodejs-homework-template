import * as contactsService from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import {
  contactAddSchema,
  contactUpdateSchema,
} from "../schemas/contacts-schema.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);

    if (!result) {
      throw HttpError(404, `Movie with id=${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const add = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateById = async (req, res, next) => {
  try {
    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contactsService.updateContactById(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Movie with id=${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Movie with id=${contactId} not found`);
    }

    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
};
