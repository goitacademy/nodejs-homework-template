import * as contactService from "../models/contactsModel.js";
import HttpError from "../helpers/HttpError.js";
import {
  contactAddSchema,
  contactUpdateSchema,
} from "../schema/contacts-schema.js";

const getAllContacts = async (req, res) => {
  try {
    const result = await contactService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};
const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactService.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found `);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
const addContacts = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
const updateContactsById = async (req, res, next) => {
  try {
    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await contactService.updateContact(id, req.body);
    res.status(201).json(result);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found `);
    }
  } catch (error) {
    next(error);
  }
};
const delContactsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactService.removeContact(id);
    if (!result) {
      throw HttpError(404, `Movie with ${id} not found`);
    }
    res.status(204).json({ message: "Delete success" });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllContacts,
  getContactById,
  addContacts,
  updateContactsById,
  delContactsById,
};
