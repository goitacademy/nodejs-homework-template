import contactService from "../models/contacts.js"; // logical-func
import { HttpError } from "../helpers/index.js"; // errors
import {
  contactAddSchema,
  updateScheme,
} from "../schemes/addContactSchemes.js";

const getAllContacts = async (req, res, next) => {
  try {
    const result = await contactService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getByID = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Contact does not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addNewContact = async (req, res, next) => {
  try {
    const validatedResult = contactAddSchema.validate(req.body);
    const error = validatedResult.error;
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const validatedResult = updateScheme.validate(req.body);
    const error = validatedResult.error;
    if (error) {
      throw HttpError(400, error.message);
    }
    const id = req.params.contactId;
    const result = await contactService.updateContact(id, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Contact does not found");
    }
    res.status(201).json({ message: "Contact is deleted" });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllContacts,
  getByID,
  addNewContact,
  updateById,
  deleteById,
};
